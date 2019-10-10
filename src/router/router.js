import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: '/aaa',
          name: '智慧卡支付的发卡管理',
          component: () => import('../views/pages/aaa.vue'),
        },
        {
          path: '/d',
          name: '权限管理的菜单授权',
          component: () => import('../views/pages/d.vue'),
        }, {
          path: '/h',
          name: '芝麻开门的打开',
          component: () => import('../views/pages/h.vue'),
        }, , {
          path: '/k',
          name: '消息中心的已读消息',
          component: () => import('../views/pages/k.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    }, {
      path: '/401',
      name: '401',
      component: () => import('../views/error/401.vue'),
    }, {
      path: '/404',
      name: '404',
      component: () => import('../views/error/404.vue'),
    }
  ]
});
