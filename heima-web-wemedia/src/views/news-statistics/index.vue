<template>
  <div class="filter-container bgc">
    <div class="filter">
      <el-form ref="form" :inline="true" size="medium">
        <el-form-item label="数据时间：" style="margin-right: 30px;">
          <el-date-picker
            v-model="parms.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            placeholder="选择日期"
            style="width: 400px;"
            :picker-options="pickerOptions"
            @change="handleDateChange"
          />
        </el-form-item>
        <el-form-item>
          <day-week-month @handleChange="handleRadioGroupSelChange" />
        </el-form-item>
      </el-form>
    </div>

    <!-- 指标统计 -->
    <dimension-statist
      :statistList="statistList"
      :colorPlate1="colorPlate1"
      :colorPlate2="colorPlate2"
      :colorPlate3="colorPlate3"
    />

    <!-- 文章列表 -->
    <article-pagination />
  </div>
</template>

<script>
import DayWeekMonth from '@/components/day-week-month'
import DimensionStatist from './components/DimensionStatist'
import ArticlePagination from './components/ArticlePagination'
import { getOverAllStatistics } from '@/api/statistic'

export default {
  name: 'ContentStatist',
  data () {
    return {
      parms: {
        type: '30',
        time: []
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      statistList: [
        {
          icon: 'iconicon_data_twfbl',
          number: '',
          text: '图文发布量'
        },
        {
          icon: 'iconicon_data_dianzan',
          number: '',
          text: '点赞数量'
        },
        {
          icon: 'iconicon_data_scsl',
          number: '',
          text: '收藏数量'
        },
        {
          icon: 'iconicon_data_tjzfl',
          number: '',
          text: '转发数量'
        }
      ],
      query: {
        beginDate: 0,
        endDate: 0
      },
      statisticOverall: {},
      colorPlate1: ['#E5F6FF', '#E2F6E9', '#FFF0E9', '#F6F3FF'],
      colorPlate2: ['#B7E6FF', '#C3E8D1', '#FFDAC9', '#D9D3FF'],
      colorPlate3: ['#2C71FF', '#3BD396', '#FF562D', '#5A3ED4']
    }
  },
  components: {
    DayWeekMonth,
    DimensionStatist,
    ArticlePagination
  },
  created () {
    // 修改query
    const todayBegin = new Date()
    todayBegin.setHours(0, 0, 0, 0)
    this.query.beginDate = todayBegin.getTime()
    this.query.endDate = Date.now()

    // 获取数据
    this.getStatisticOverall()
  },
  methods: {
    handleRadioGroupSelChange (radioGroupSel) {
      this.parms.type = radioGroupSel
      // console.log(`时间点已改变${radioGroupSel}, ${JSON.stringify(this.parms)}`)
      // 计算当前时间
      const now = Date.now()
      let beginDate = now // 默认当前时间

      if (radioGroupSel === '0') {
        // 当日记录（开始时间为当天 00:00:00）
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        beginDate = today.getTime()
      } else if (radioGroupSel === '1') {
        // 本周记录（从周一 00:00:00 开始）
        const today = new Date()
        const dayOfWeek = today.getDay() || 7 // 处理周日（getDay() 为 0）
        today.setDate(today.getDate() - dayOfWeek + 1)
        today.setHours(0, 0, 0, 0)
        beginDate = today.getTime()
      } else if (radioGroupSel === '7') {
        // 近 7 天记录（从 7 天前的 00:00:00 开始）
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6) // 近 7 天包含今天
        sevenDaysAgo.setHours(0, 0, 0, 0)
        beginDate = sevenDaysAgo.getTime()
      } else if (radioGroupSel === '30') {
        // 近 30 天记录（从 30 天前的 00:00:00 开始）
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29) // 近 30 天包含今天
        thirtyDaysAgo.setHours(0, 0, 0, 0)
        beginDate = thirtyDaysAgo.getTime()
      }

      // 更新查询参数
      this.query.beginDate = beginDate
      this.query.endDate = now

      // console.log(`查询时间范围(ISO): ${new Date(this.query.beginDate).toISOString()} ~ ${new Date(this.query.endDate).toISOString()}`)
      // console.log(`查询时间范围(timestamp): ${this.query.beginDate} ~ ${this.query.endDate}`)

      // 查询时间段内数据
      this.getStatisticOverall()
    },
    handleDateChange (a) {
      // console.log(`时间段已改变${a}, ${this.parms.time}`)

      // 更新查询参数
      const start = this.parms.time[0]
      // 处理endDate
      let end = new Date(this.parms.time[1])
      end.setHours(23, 59, 59, 999)
      end = end.getTime()
      this.query.beginDate = start
      this.query.endDate = end

      // console.log(`查询时间范围(timestamp): ${start} ~ ${end}`)

      // 查询时间段内数据
      this.getStatisticOverall()
    },
    getStatisticOverall () {
      getOverAllStatistics(this.query).then(response => {
        const data = response.data
        // console.log(`overall返回: ${data}`)
        this.statistList[0].number = data.newsPublishCnt
        this.statistList[1].number = data.newsLikeCnt
        this.statistList[2].number = data.newsCollectCnt
        this.statistList[3].number = data.newsForwardCnt
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.filter-container {
  padding: 0 30px 30px;

  .filter {
    height: 78px;
    padding: 0;
    border-bottom: none;

    .el-form-item {
      margin-bottom: 0;
    }

    /deep/ .el-form-item__content {
      line-height: 1;
    }
  }
}
</style>
