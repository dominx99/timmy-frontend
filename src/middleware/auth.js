export default async function auth ({ next, router }) {
  let token = localStorage.getItem('access_token');

  if (token === null || typeof token === "undefined" || token === '') {
    return router.push({ name: 'login' })
  }

  return next()
}
