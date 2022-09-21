import { handleApi } from '@/utils/handleApi'

export const state = () => ({})

export const mutations = {
}

export const actions = {
  getListNews(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/news?` + new URLSearchParams(query).toString()), context)
    })
  },
  getDetailNew(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/news/${data}`), context)
    })
  }
}
