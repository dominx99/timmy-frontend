export default async function guest ({ next, router }) {
  let token = localStorage.getItem('access_token');

  if (token !== null && token !== undefined && token !== '') {
    return router.push({ name: 'lobby' })
  }

  return next()
}
