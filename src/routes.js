import Login from './views/LoginView'
import Register from './views/RegisterView'
import Day from './views/DayView'

import guest from './middleware/guest'
import auth from './middleware/auth'

export default [
  {
    path: '/',
    component: Day,
    name: 'day',
    meta: {
      middleware: auth
    }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      middleware: guest
    }
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      middleware: guest
    }
  }
]
