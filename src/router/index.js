import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
// import SimpleStudy from '@/components/SimpleStudy'
// import Register from '@/components/Register'
// import EnrollPatient from '@/components/EnrollPatient'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
  ]
})
