import { handleApi } from '@/utils/handleApi'

export const state = () => ({})

export const mutations = {
}

export const actions = {
  register(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/contact/store', data), context)
    })
  }
}
