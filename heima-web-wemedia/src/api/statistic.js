import Request from '@/utils/request'
import {
  API_FANS_LIST,
  API_FOLLOW_FANS,
  API_STATISTICS_NEWS,
  API_STATISTICS_OVERALL,
  API_STATISTICS_PORTRAIT
} from '@/constants/api'

// 获取统计数据
export function getOverAllStatistics (data) {
  return Request({
    url: API_STATISTICS_OVERALL,
    method: 'post',
    data: data
  })
}

export function getNewsStatisticsList (query) {
  return Request({
    url: API_STATISTICS_NEWS,
    method: 'post',
    data: query
  })
}

export function getStatisticsPortrait (data) {
  return Request({
    url: API_STATISTICS_PORTRAIT,
    method: 'post',
    data: data
  })
}

// 粉丝相关
// 获取粉丝列表
export function getFanList (data) {
  return Request({
    url: API_FANS_LIST,
    method: 'post',
    data: data
  })
}

export function followFans (data) {
  return Request({
    url: API_FOLLOW_FANS,
    method: 'post',
    data: data
  })
}
