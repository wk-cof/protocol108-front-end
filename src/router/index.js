import Vue from 'vue'
import Router from 'vue-router'
import Protocol from '@/components/Protocol'
import Details from '@/components/Details'
import FlipClock from '@/components/FlipClock'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Protocol',
      component: Protocol
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/flip',
      name: 'FlipClock',
      component: FlipClock
    }
  ]
})
