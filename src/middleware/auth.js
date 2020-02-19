// import store from './../store/index'

export default async function auth ({ next, router }) {
  let token = localStorage.getItem('access_token');

  if (token === null || typeof token === "undefined" || token === '') {
    return router.push({ name: 'login' })
  }

  // try {
  //   await store.dispatch('user/get')
  // } catch (e) {
  //   localStorage.setItem('access_token', '')
  //   router.push({ name: 'login' })
  // }

  return next()
}
