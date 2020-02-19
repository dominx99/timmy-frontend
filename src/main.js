import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Pusher from 'pusher-js'
import '@/assets/scss/tailwind.scss'
const moment = require('moment')

Vue.use(VueRouter)

Vue.use(require('vue-moment'), {
  moment
})
require("moment/locale/pl")

Vue.prototype.$bus = new Vue()

import routes from './routes'
import store from './store/index'

window.socket = new Pusher('ed5340121001ba23bad9', {
  cluster: 'eu',
  forceTLS: true
});

let axios = require('axios')
window.axios = axios.create({
  transformRequest: [function (data, headers) {
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    return JSON.stringify(data)
  }],
  headers: {
    'Content-Type': 'application/json'
  }
})
Vue.prototype.$axios = window.axios

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})
window.router = router

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
