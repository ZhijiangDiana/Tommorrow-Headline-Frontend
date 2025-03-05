<template>
  <div class="follow-list" @touchmove.stop>
    <common_top_bar></common_top_bar>
    <div class="tabs">
      <span :class="{'active': activeTab === 'follow'}" @click="switchPage(0)">关注</span>
      <span :class="{'active': activeTab === 'fans'}" @click="switchPage(1)">粉丝</span>
    </div>
    <div>
      <div v-for="(user, index) in users" :key="index" class="user-item">
        <img :src="user.avatar" class="avatar" />
        <div class="info">
          <div class="name">{{ user.name }}</div>
          <div class="description">{{ user.description }}</div>
        </div>
        <button :class="getButtonClass(user)" @click="toggleFollow(user)">{{ getButtonText(user) }}</button>
      </div>
    </div>
  </div>
</template>

<script>

import Common_top_bar from "@/compoents/bars/common_top_bar.vue";
import Api from "@/apis/my_personal/api";

export default {
  components: {Common_top_bar},
  data() {
    return {
      entryPage: {
        type: Number,
        default: 0
      },
      activeTab: 'follow',
      users: [],
      followers: [
        // {
        //   name: '这是粉丝列表',
        //   description: "111111",
        //   avatar: 'http://121.40.25.50:9050/leadnews/default_avatar.jpeg',
        //   isFollowing: false,
        //   isMutual: false
        // },{
        //   name: '马+7',
        //   description: "喜欢假期，被你发现",
        //   avatar: 'http://121.40.25.50:9050/leadnews/default_avatar.jpeg',
        //   isFollowing: false,
        //   isMutual: false
        // },{
        //   name: '柿本广大',
        //   description: "没亩玩意别惦记着你那mujica了",
        //   avatar: 'http://121.40.25.50:9050/leadnews/default_avatar.jpeg',
        //   isFollowing: false,
        //   isMutual: false
        // }
      ],
      followings: [
        // {
        //   name: '这是关注列表',
        //   description: "111111",
        //   avatar: 'http://121.40.25.50:9050/leadnews/default_avatar.jpeg',
        //   isFollowing: true,
        //   isMutual: false
        // },{
        //   name: '时代少年团',
        //   description: "时代少年团，我们喜欢你~",
        //   avatar: 'http://121.40.25.50:9050/leadnews/default_avatar.jpeg',
        //   isFollowing: true,
        //   isMutual: false
        // },{
        //   name: '滚木',
        //   description: "null",
        //   avatar: 'http://121.40.25.50:9050/leadnews/default_avatar.jpeg',
        //   isFollowing: true,
        //   isMutual: false
        // },{
        //   name: '电棍',
        //   description: "唉你怎么亖了",
        //   avatar: 'http://121.40.25.50:9050/leadnews/default_avatar.jpeg',
        //   isFollowing: true,
        //   isMutual: false
        // }
      ]
    };
  },
  created() {
    Api.setVue(this);
    // 0关注 1粉丝
    this.entryPage = this.$route.query.type;
    // TODO 获取关注和粉丝列表
    this.getFanFollowingList()
  },
  methods: {
    switchPage(page) {
      // 0关注列表 1粉丝列表
      if (page === 0) {
        this.activeTab = 'follow';
        this.users = this.followings;
      } else {
        this.activeTab = 'fans';
        this.users = this.followers;
      }
    },
    getButtonClass(user) {
      if (user.isFollowing) return 'followed';
      if (user.isMutual) return 'mutual';
      return 'follow';
    },
    getButtonText(user) {
      if (user.isFollowing) return '已关注';
      if (user.isMutual) return '互相关注';
      return '关注';
    },
    getFanFollowingList() {
      Api.loadUserFans().then((d)=>{
        console.log(JSON.stringify(d))
        this.followers = d.data
      }).catch((e)=>{
        console.log(e)
      })
      Api.loadUserFollowing().then((d)=>{
        console.log(JSON.stringify(d))
        this.followings = d.data
        this.switchPage(this.entryPage)
      }).catch((e)=>{
        console.log(e)
      })
    },
    toggleFollow(user) {
      user.isFollowing = !user.isFollowing;
      // TODO 发送关注/取关请求
    }
  }
};
</script>

<style scoped>
.follow-list {
  font-family: sans-serif;
}
.tabs {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  flex-direction: row; /* 横向排列 */
  align-items: center; /* 垂直方向居中 */
  text-align: center; /* 子项内容居中 */
  border-bottom: 2px solid #eee;
}
.tabs span {
  padding: 10px;
  cursor: pointer;
  flex: 1; /* 每个项目等宽 */
  display: flex; /* 使用 Flex 布局 */
  flex-direction: column; /* 项目内容纵向排列 */
  justify-content: center; /* 垂直方向居中 */
  align-items: center; /* 水平方向居中 */
}
.tabs .active {
  color: red;
  border-bottom: 2px solid red;
  flex: 1; /* 每个项目等宽 */
  display: flex; /* 使用 Flex 布局 */
  flex-direction: column; /* 项目内容纵向排列 */
  justify-content: center; /* 垂直方向居中 */
  align-items: center; /* 水平方向居中 */
}
.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右对齐 */
  flex-direction: row; /* 横向排列 */
  padding: 20px;
  margin-left: 20px;
  border-bottom: 1px solid #eee;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}
.info {
  flex: 1;
}
.name {
  font-size: 25px;
}
.description {
  font-size: 25px;
  color: #999;
}
button {
  padding: 7px 30px;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  margin-right: 20px;
}
.follow {
  background: red;
  color: white;
}
.followed {
  background: #f0f0f0;
  color: #999;
}
</style>
