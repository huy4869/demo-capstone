import { handleApi } from '@/utils/handleApi'

export const state = () => ({})

export const mutations = {
}

export const actions = {
  getList(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/packages`), context)
    })
  },
  buy(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/packages/buy`, params), context)
    })
  }
}
