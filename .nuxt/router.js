import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _21fea733 = () => interopDefault(import('../pages/company.vue' /* webpackChunkName: "pages/company" */))
const _7d057088 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _75d93be5 = () => interopDefault(import('../pages/post/_key.vue' /* webpackChunkName: "pages/post/_key" */))
const _0dbb7674 = () => interopDefault(import('../pages/search/_query.vue' /* webpackChunkName: "pages/search/_query" */))
const _550183ee = () => interopDefault(import('../pages/topics/_id.vue' /* webpackChunkName: "pages/topics/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/company",
    component: _21fea733,
    name: "company"
  }, {
    path: "/",
    component: _7d057088,
    name: "index"
  }, {
    path: "/post/:key?",
    component: _75d93be5,
    name: "post-key"
  }, {
    path: "/search/:query?",
    component: _0dbb7674,
    name: "search-query"
  }, {
    path: "/topics/:id?",
    component: _550183ee,
    name: "topics-id"
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
