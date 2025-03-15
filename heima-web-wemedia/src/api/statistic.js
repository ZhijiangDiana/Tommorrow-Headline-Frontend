import Request from '@/utils/request'
import { API_STATISTICS_NEWS, API_STATISTICS_OVERALL, API_STATISTICS_PORTRAIT } from '@/constants/api'

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

export function deleteArticles (data) {
  return Request({
    url: API_STATISTICS_PORTRAIT,
    method: 'post',
    data: data
  })
}
