import { handleApi } from '@/utils/handleApi'

export const state = () => ({})

export const mutations = {
}

export const actions = {
  getListInvite(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/invite-user?` + new URLSearchParams(query).toString()), context)
    })
  },
  bankAccount(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/settings/bank`), context)
    })
  },
  getHistory(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/transactions?` + new URLSearchParams(query).toString()), context)
    })
  },
  getWithdraw(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/withdraw?` + new URLSearchParams(query).toString()), context)
    })
  },
  getStatusList(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/withdraw/status`), context)
    })
  },
  addRequestWithdraw(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/withdraw/request`, data), context)
    })
  },
  update(context, params) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/user`, params), context)
    })
  }
}
