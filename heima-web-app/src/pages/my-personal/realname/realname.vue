<template>
  <div>
    <common_top_bar text="实名认证"></common_top_bar>

    <div v-if="realname.status == 0" class="verification-container">
      <h3>上传身份证明（仅用于自媒体人认证）</h3>
      <div class="upload-section">
        <div class="upload-box" @click="uploadImage('idCardBack')">
          <span v-if="!images.idCardBack">+</span>
          <p v-if="!images.idCardBack">身份证国徽面</p>
          <image v-else class="upload-img" :src="images.idCardBack"/>
        </div>
        <div class="sample-box">
          <image class="img" src="/static/images/my_personal/realname/idcard_back.jpg"/>
          <p>示例图</p>
        </div>
      </div>
      <div class="upload-section">
        <div class="upload-box" @click="uploadImage('idCardFront')">
          <span v-if="!images.idCardFront">+</span>
          <p v-if="!images.idCardFront">身份证信息面</p>
          <image v-else class="upload-img" :src="images.idCardFront"/>
        </div>
        <div class="sample-box">
          <image class="img" src="/static/images/my_personal/realname/idcard_front.jpg"/>
          <p>示例图</p>
        </div>
      </div>

      <div v-if="canDisplayIdInfo" class="form">
        <div class="form-item">
          <text class="label">姓名：</text>
          <input class="input" v-model="images.name"/>
        </div>
        <div class="form-item">
          <text class="label">证件号：</text>
          <input class="input" v-model="images.idCardNumber"/>
        </div>
      </div>


      <button :disabled="!canProceed" @click="submit">下一步</button>
    </div>
    <div v-else class="verification-container">
      <h3>   </h3>
      <image :src="getCenterImage" class="center-image"></image>
      <div class="description">{{ statusDescription }}</div>
      <button v-if="realname.status == 2" @click="restartRealname">返回实名界面</button>
    </div>
  </div>
</template>

<script>
import Common_top_bar from "@/compoents/bars/common_top_bar.vue";
import Api from "@/apis/my_personal/api";

const modal = weex.requireModule("modal")

export default {
  components: {Common_top_bar},
  data() {
    return {
      images: {
        idCardBack: "",
        idCardFront: "",
        name: "",
        idCardNumber: "",
      },
      realname: {
        status: 0,
        reason: ""
      },
      statusDescription: "",
    };
  },
  computed: {
    canProceed() {
      return this.images.idCardBack && this.images.idCardFront && this.images.name && this.images.idCardNumber;
    },
    canDisplayIdInfo() {
      return this.images.name && this.images.idCardNumber;
    },
    getCenterImage() {
      const temp = this.realname.reason ? this.realname.reason : ""
      switch (this.realname.status) {
        case 1:
          this.statusDescription = "请等待管理员审核"
          return "/static/images/my_personal/realname/status/dengdai.png";
        case 2:
          this.statusDescription = "很遗憾，实名审核未通过\n原因：" + temp
          return "/static/images/my_personal/realname/status/cuowu.png";
        case 9:
          this.statusDescription = "恭喜你，已实名成功"
          return "/static/images/my_personal/realname/status/zhengque.png";
        default:
          return ""
      }
    }
  },
  created() {
    Api.setVue(this);
    this.getRealnameStatus()
  },
  methods: {
    getRealnameStatus() {
      Api.getRealnameStatus().then(res => {
        if (res.code == 200) {
          this.realname = res.data
          // console.log(this.realname);
        } else {
          modal.toast({ message: res.errorMessage, duration:3})
        }
      }).catch(error => {
        modal.toast({ message: error.message, duration:3})
      })
    },
    restartRealname() {
      Api.restartRealname().then(res => {
        if (res.code == 200) {
          this.getRealnameStatus()
        } else {
          modal.toast({ message: res.errorMessage, duration:3})
        }
      }).catch(error => {
        modal.toast({ message: error.message, duration:3})
      })
    },
    uploadImage(type) {
      // 创建 input 文件选择框
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/jpeg, image/png"
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.images[type] = e.target.result;
          };
          reader.readAsDataURL(file);

          const fd = new FormData()
          fd.append('multipartFile', file, file.name)

          Api.uploadImage(fd).then((result) => {
            // console.log(result)
            if (result.code == 200) {
              if (type === "idCardBack") {
                this.images.idCardBack = result.data;
                // console.log(this.images.idCardFront);
              } else if (type === "idCardFront") {
                this.images.idCardFront = result.data;
                // console.log("发起身份证识别请求")
                // console.log(this.images.idCardFront);
                this.getIdCardInfo();
              }
            } else {
              modal.toast({ message: result.errorMessage, duration:3})
            }
          }).catch((e)=>{
            modal.toast({ message: e.message, duration:3})
          })
        }
      };
      input.click(); // 触发文件选择
    },
    getIdCardInfo() {
      Api.recoIdCard(this.images).then(res => {
        if (res.code == 200) {
          this.images.idCardNumber = res.data.idCardNumber
          this.images.name = res.data.name
          modal.toast({ message: "请检查信息是否识别正确", duration:3})
        } else {
          this.images.idCardNumber = ""
          this.images.name = ""
          modal.toast({ message: res.errorMessage, duration:3})
        }
      }).catch((e) => {
        this.images.idCardNumber = ""
        this.images.name = ""
        modal.toast({ message: e.message, duration:3})
      })
    },
    submit() {
      Api.submitRealname(this.images).then(res => {
        if (res.code == 200) {
          this.$router.back()
        } else {
          modal.toast({ message: res.result.errorMessage, duration:3})
        }
      }).catch((e) => {
        modal.toast({ message: e.message, duration:3})
      })
    }
  },
};
</script>

<style scoped>
.verification-container {
  width: 100%;
  padding: 20px;
  background: #fff;
  text-align: center;
  overflow-y: auto;
}
.upload-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.upload-box {
  width: 300px;
  height: 300px;
  border: 1px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}
.sample-box {
  width: 300px;
  height: 300px;
  border: 0;
  margin-left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}
.upload-img {
  width: 100%;
  height: 100%;
  align-self: center;
  object-fit: cover;
}
.img {
  width: 100%;
  height: 62.5%;
  align-self: center;
  object-fit: contain; /* 确保完整显示图片 */
}
button {
  width: 100%;
  padding: 10px;
  margin-top: 100px;
  background: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.form {
  margin-top: 20px;
}
.form-item {
  margin-left: 40px;
  margin-right: 40px;
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.label {
  width: 120px;
  font-size: 30px;
}
.input {
  flex: 1;
  font-size: 30px;
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
.center-image {
  height: 400px;
  width: 400px;
  margin: auto;
}
.description {
  font-size: 40px;
  margin-top: 100px;
  display: flex;
  align-items: center;
  white-space: pre-line;
}
</style>