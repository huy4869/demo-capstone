import { handleApi } from '@/utils/handleApi'

export const state = () => ({})

export const mutations = {}

export const actions = {
  getLstTree(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/invite-user/${data}/tree`), context)
    })
  }
}
