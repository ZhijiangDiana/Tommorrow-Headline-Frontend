<template>
  <div class="container" @touchmove.stop :style="{ height: (tabPageHeight)+'px' }">
    <!-- 顶部用户信息 -->
    <div class="header">
      <!-- 左侧头像和用户信息 -->
      <div class="user-info">
        <img class="avatar" :src="user.avatar" />
        <div class="info">
          <div class="name">{{ user.name }}</div>
          <div class="badge" v-if="user.verified">{{ isVerifiedStr }}</div>
        </div>
      </div>
      <!-- 右侧今日阅读信息 -->
      <div class="reading">
        <div class="reading-label">今日阅读</div>
        <div class="reading-time">{{ user.readingTime }}</div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="stats">
      <div class="stat-item">
        <div class="number">{{ user.posts }}</div>
        <div class="label">动态</div>
      </div>
      <div class="stat-item">
        <div class="number">{{ user.following }}</div>
        <div class="label">关注</div>
      </div>
      <div class="stat-item">
        <div class="number">{{ user.followers }}</div>
        <div class="label">粉丝</div>
      </div>
    </div>

    <!-- 按钮区域 (横向等间距排列) -->
    <div class="wrapper">
      <div class="tabs">
        <div class="stat-item" @click="goTo(0)">
          <image class="img" src="/static/images/my_personal/shoucang.png" />
          <div class="tab-btn">收藏</div>
        </div>
        <div class="stat-item" @click="goTo(1)">
          <image class="img" src="/static/images/my_personal/lishijilu.png" />
          <div class="tab-btn">历史</div>
        </div>
        <div class="stat-item" @click="goTo(2)">
          <image class="img" src="/static/images/my_personal/wenzhang.png" />
          <div class="tab-btn">作品</div>
        </div>
      </div>
    </div>

    <!-- 菜单列表 -->
    <div class="menu">
      <div class="menu-item" @click="goTo(1000)">消息通知 ></div>
      <div class="menu-item" @click="goTo(1001)">实名认证 ></div>
      <div class="menu-item" @click="goTo(1002)">私信 ></div>
      <div class="menu-item" @click="goTo(1003)">用户反馈 ></div>
      <div class="menu-item" @click="goTo(1004)">系统设置 ></div>
    </div>
  </div>
</template>

<script>
import WxcTabPage from "@/compoents/tabs/home_tabs.vue";
import {Utils} from "weex-ui";
import config from './config';
import Api from "@/apis/my_personal/api";

export default {
  components: {WxcTabPage},
  data() {
    return {
      route: config.nextPage,
      tabPageHeight: 1145,
      isVerifiedStr: '未实名',
      user: {
        name: "",
        avatar: "",
        verified: true,
        readingTime: "11小时45分钟",
        posts: 1145,
        following: 1145,
        followers: 1145,
      }
    };
  },
  created() {
    this.tabPageHeight = Utils.env.getScreenHeight()-132;
    console.log("tabPageHeight: ",this.tabPageHeight)

    Api.setVue(this);
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      Api.loaduserinfo().then((d)=>{
        console.log(JSON.stringify(d))
        this.user = d.data
        this.isVerifiedStr = this.user.verified ? "已实名" : "未实名"
      }).catch((e)=>{
        console.log(e)
      })
    },
    // 0收藏 1历史 2作品
    // 1000消息通知 1001实名认证 1002私信 1003用户反馈 1004系统设置 1005关于
    goTo(page) {
      console.log(`跳转到 ${this.route[page]}`);

    },
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/common';

.wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}

.container {
  //flex: 1; /* 主内容区可伸缩，支持滚动 */
  overflow-y: auto; /* 启用垂直滚动 */
  background-color: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  flex-direction: row; /* 横向排列 */
  align-items: center; /* 垂直方向居中 */
  padding: 20px; /* 内边距 */
  background: #333; /* 背景色 */
  color: #fff; /* 文字颜色 */
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info {
  display: flex; /* 头像和信息水平排列 */
  flex-direction: row;
  align-items: center; /* 垂直方向居中 */
  flex: 1; /* 左侧占满空间 */
  margin: 20px 30px 40px 40px;
}

.info {
  display: flex; /* 用户信息垂直排列 */
  flex-direction: column;
}

.name {
  font-size: 40px;
  color: #fff; /* 文字颜色 */
}

.badge {
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: orange; /* 按钮背景色 */
  color: #fff; /* 按钮文字颜色 */
  padding-top: 2px;
  padding-right: 15px;
  padding-bottom: 7px;
  padding-left: 15px; /* 上下左右内边距，控制内容和边框的间距 */
  border-radius: 10px; /* 圆角 */
  text-align: center; /* 文字居中 */
  font-size: 20px; /* 字体大小 */
  height: auto; /* 让高度由文字内容和 padding 决定 */
  line-height: normal; /* 取消默认 line-height */
  margin-top: 15px;
}

.reading {
  display: flex; /* 今日阅读信息垂直排列 */
  flex-direction: column;
  align-items: flex-end; /* 靠右对齐 */
  text-align: right;
}

.reading-label {
  font-size: 25px; /* 今日阅读标题 */
  color: #fff; /* 文字颜色 */
}

.reading-time {
  font-size: 25px; /* 阅读时间字体大小 */
  font-weight: bold; /* 粗体 */
  color: #fff; /* 文字颜色 */
}

.stats {
  display: flex;
  justify-content: space-between; /* 项目之间均匀分布 */
  flex-direction: row; /* 横向排列 */
  padding: 20px 0; /* 上下内边距 */
  background: #333; /* 背景色 */
  margin: 0; /* 上下的外边距 */
  text-align: center; /* 子项内容居中 */
}

.stat-item {
  flex: 1; /* 每个项目等宽 */
  display: flex; /* 使用 Flex 布局 */
  flex-direction: column; /* 项目内容纵向排列 */
  justify-content: center; /* 垂直方向居中 */
  align-items: center; /* 水平方向居中 */
}

.number {
  font-size: 25px; /* 数字字体大小 */
  font-weight: bold; /* 数字加粗 */
  margin-bottom: 5px; /* 数字与标题间距 */
  color: #fff; /* 文字颜色 */
}

.label {
  font-size: 25px; /* 标题字体大小 */
  color: #fff; /* 文字颜色 */
}

.tabs {
  display: flex;
  flex-direction: row;
  flex: none;
  align-items: center; /* 保证垂直方向居中 */
  justify-content: space-between; /* 水平方向等间距 */
  padding: 10px 0; /* 按钮与上下边距 */
  margin: 20px 0; /* 上下组件距离各自 20px */
}

.img {
  width: 60px;
  height: 60px;
}

.tab-btn {
  height: 40px; /* 指定按钮的固定高度 */
  line-height: 40px; /* 调整文字在按钮中的垂直居中 */
  flex: 1; /* 确保按钮等宽 */
  text-align: center; /* 按钮文字居中 */
}

.menu {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.menu-item {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 40px;
  border-bottom: 3px solid #eee;
}

.menu-item:last-child {
  border-bottom: none;
}
</style>

