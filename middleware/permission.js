import { AUTH_SET_PERMISSIONS, AUTH_SET_ROLES } from '@/constants/store'

export default function({ isHMR, app, store, route, params, error, redirect }) {
  if (app.$auth.loggedIn) {
    let permissions = []
    store.commit(AUTH_SET_ROLES, app.$auth.user.roles.map(item => {
      permissions = permissions.concat(item.permissions.map(per => per.name))
      return item.name
    }))
    store.commit(AUTH_SET_PERMISSIONS, permissions)
  }
}
