import { SET_IS_OPT_PAGE } from '@/store/store.const'

export default async function({ app, store, route, error, redirect }) {
  const publicPages = ['/', '/login', '/register', '/logout']
  const authPages = ['/login', '/register', '/logout', '/user/reset-password', '/forgot-pass']
  const isAuthPage = authPages.includes(route.path)
  store.commit(SET_IS_OPT_PAGE, isAuthPage)
  const authRequired = !publicPages.includes(route.path) && !route.path.toString().startsWith('/register')
  await app.$auth.fetchUser()
  const loggedIn = app.$auth.loggedIn
  if (route.path.toString().startsWith('/forgot-pass')) {
    loggedIn ? redirect('/') : redirect()
    return
  }
  // redirect to login page
  if (route.path === '/') {
    redirect('/')
    return
  }
  if (authRequired && !loggedIn) {
    redirect('/login')
  } else {
    ((route.path === '/login' || route.path === '/register' ||
      route.path.toString().startsWith('/register')) && loggedIn) ? redirect('/') : redirect()
  }
}
