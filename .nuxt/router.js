import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _58ad4e3e = () => interopDefault(import('..\\pages\\course\\index.vue' /* webpackChunkName: "pages/course/index" */))
const _6b0f9873 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _eba270ee = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _0a65b716 = () => interopDefault(import('..\\pages\\teacher\\index.vue' /* webpackChunkName: "pages/teacher/index" */))
const _bd301548 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _246bc0ee = () => interopDefault(import('..\\pages\\course\\_id.vue' /* webpackChunkName: "pages/course/_id" */))
const _95d281d4 = () => interopDefault(import('..\\pages\\orders\\_oid.vue' /* webpackChunkName: "pages/orders/_oid" */))
const _31f9e17e = () => interopDefault(import('..\\pages\\pay\\_pid.vue' /* webpackChunkName: "pages/pay/_pid" */))
const _1cee6a4e = () => interopDefault(import('..\\pages\\player\\_vid.vue' /* webpackChunkName: "pages/player/_vid" */))
const _110286fe = () => interopDefault(import('..\\pages\\teacher\\_id.vue' /* webpackChunkName: "pages/teacher/_id" */))

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
    component: _58ad4e3e,
    name: "course"
  }, {
    path: "/login",
    component: _6b0f9873,
    name: "login"
  }, {
    path: "/register",
    component: _eba270ee,
    name: "register"
  }, {
    path: "/teacher",
    component: _0a65b716,
    name: "teacher"
  }, {
    path: "/",
    component: _bd301548,
    name: "index"
  }, {
    path: "/course/:id",
    component: _246bc0ee,
    name: "course-id"
  }, {
    path: "/orders/:oid?",
    component: _95d281d4,
    name: "orders-oid"
  }, {
    path: "/pay/:pid?",
    component: _31f9e17e,
    name: "pay-pid"
  }, {
    path: "/player/:vid?",
    component: _1cee6a4e,
    name: "player-vid"
  }, {
    path: "/teacher/:id",
    component: _110286fe,
    name: "teacher-id"
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
