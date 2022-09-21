import { handleApi } from '@/utils/handleApi'

export const state = () => ({
  roles: [],
  permissions: [],
  openModalLoginState: true,
  resetCartState: true
})

export const mutations = {
  setRoles(state, roles) {
    state.roles = roles
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  }
}

export const actions = {
  register(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/auth/register', data), context)
    })
  },
  verifyRegisterOtp(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/auth/verify-register', data), context)
    })
  },
  reSendOtp(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('auth/resend-otp', data), context)
    })
  },
  sendEmailForgot(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('auth/forgot-password', data), context)
    })
  },
  resetPass(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('auth/reset-password', data), context)
    })
  },
  checkToken(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('auth/check-token', data), context)
    })
  },
  logout(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('auth/logout'), context)
    })
  }
}
