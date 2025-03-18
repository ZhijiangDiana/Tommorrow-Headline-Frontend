<template>
  <div>
    <!-- 粉丝概况/粉丝画像/粉丝列表 -->
    <manage-tab-bar />

    <div class="content-card">
      <el-card
        v-for="(item, index) in fansList"
        :key="index"
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <img class="image" :src="item.image" />
        <div class="name">{{ item.name }}</div>
        <div class="operate">
          <div class="item">
            <el-button class="follow" @click="switchFollowFans(index)">{{ item.isFollowing ? "已关注" : "关注" }}</el-button>
          </div>
          <div class="item">
            <el-button class="contact">私信</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <el-button class="more" @click="loadMoreFansList" v-if="hasMore">
      {{ hasMore ? "点击查看更多" : "没有更多了" }}
    </el-button>
  </div>
</template>

<script>
import ManageTabBar from '../fans-statistics/components/ManageTabBar'
import { followFans, getFanList } from '@/api/statistic'

export default {
  name: 'FansList',
  data () {
    return {
      fansList: [],
      params: {
        page: 1,
        size: 10
      },
      followParams: {
        authorId: 0,
        operation: 0
      },
      total: 0,
      hasMore: true
    }
  },
  components: {
    ManageTabBar
  },
  created () {
    this.loadNewFansList()
  },
  methods: {
    loadMoreFansList () {
      this.pageGetFanList()
    },
    loadNewFansList () {
      this.params.page = 1
      this.fansList = []
      this.pageGetFanList()
    },
    pageGetFanList () {
      getFanList(this.params).then(res => {
        if (res.code === 200) {
          this.fansList = this.fansList.concat(res.data)
          // console.log(this.fansList)
          this.total = res.total
          this.hasMore = res.data.length > 0
          this.params.page += 1
          // console.log(res.data.length)
          if (this.hasMore) {
            this.$message({ type: 'success', message: '操作成功' })
          } else {
            this.$message({ type: 'warning', message: '没有更多了' })
          }
        } else {
          this.$message({ type: 'error', message: res.errorMessage })
        }
      }).catch(err => {
        this.$message({ type: 'error', message: err.message })
      })
    },
    switchFollowFans (index) {
      this.followParams.authorId = this.fansList[index].id
      this.followParams.operation = this.fansList[index].isFollowing ? 1 : 0 // 0是关注 1是取消关注
      followFans(this.followParams).then(res => {
        if (res.code === 200) {
          this.fansList[index].isFollowing ^= 1
          this.$message({ type: 'success', message: '操作成功' })
        } else {
          this.$message({ type: 'error', message: res.errorMessage })
        }
      }).catch(err => {
        this.$message({ type: 'error', message: err.message })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.content-card {
  display: flex;
  flex-wrap: wrap;

  .el-card {
    position: relative;
    width: 186px;
    height: 222px;
    margin-left: 30px;
    margin-bottom: 32px;
    border-radius: 6px;
    border: 1px solid $--background-color-base;
    background: $--color-white;

    .image {
      display: block;
      width: 72px;
      height: 72px;
      margin: 34px auto 0;
    }

    .name {
      margin-top: 19px;
      text-align: center;
      font-weight: 600;
      color: $--color-text-secondary;
    }

    .operate {
      display: flex;
      height: 57px;
      margin-top: 23px;
      justify-content: space-around;
      align-items: center;

      .item {
        display: flex;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
      }

      .follow,
      .contact {
        width: 70px;
        height: 31px;
        padding: 0;
        border: none;
        background: $--background-color-base;
      }
    }
  }

  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    -webkit-box-shadow: 0px 2px 8px 4px rgba(51, 53, 58, 0.07);
    box-shadow: 0px 2px 8px 4px rgba(51, 53, 58, 0.07);
  }
}

.more {
  display: block;
  width: 207px;
  height: 50px;
  margin: 0 auto;
  border-radius: 4px;
  border: none;
  background: #d6dff2;
  color: $--color-primary;
}
</style>
