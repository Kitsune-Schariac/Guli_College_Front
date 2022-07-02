import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _53d8516e = () => interopDefault(import('..\\pages\\course\\index.vue' /* webpackChunkName: "pages/course/index" */))
const _dfd45fae = () => interopDefault(import('..\\pages\\teacher\\index.vue' /* webpackChunkName: "pages/teacher/index" */))
const _b2f05154 = () => interopDefault(import('..\\pages\\course\\_id.vue' /* webpackChunkName: "pages/course/_id" */))
const _6ffbc8d1 = () => interopDefault(import('..\\pages\\teacher\\_id.vue' /* webpackChunkName: "pages/teacher/_id" */))
const _6cea6a2e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/course",
    component: _53d8516e,
    name: "course"
  }, {
    path: "/teacher",
    component: _dfd45fae,
    name: "teacher"
  }, {
    path: "/course/:id",
    component: _b2f05154,
    name: "course-id"
  }, {
    path: "/teacher/:id",
    component: _6ffbc8d1,
    name: "teacher-id"
  }, {
    path: "/",
    component: _6cea6a2e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
