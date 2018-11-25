import Vue from 'vue'
import Router from 'vue-router'
import TeamDashboard from './views/TeamDashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'team-dashboard',
      component: TeamDashboard
    },
    {
      path: '/project/:projectId',
      name: 'project',
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue'),
      props: true
    },
    {
      path: '/project/:projectId/item/:itemId',
      name: 'item',
      component: () => import(/* webpackChunkName: "item" */ './views/Item.vue'),
      props: true
    },
    {
      path: '/project/:projectId/item/:itemId/revision/:revisionId',
      name: 'revision',
      component: () => import(/* webpackChunkName: "item" */ './views/Item.vue'),
      props: true
    },
  ]
})
