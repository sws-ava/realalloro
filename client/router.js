import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)


const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [


  { path: '/login', name: 'login', component: page('auth/login.vue') },
  // { path: '/login', name: 'login___ru', component: page('auth/login.vue') },
  // { path: '/ua/login', name: 'login___ua', component: page('auth/login.vue') },
  // { path: '/register', name: 'register', component: page('auth/register.vue') },
  { path: '/password/reset', name: 'password.request', component: page('auth/password/email.vue') },
  { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/reset.vue') },
  { path: '/email/verify/:id', name: 'verification.verify', component: page('auth/verification/verify.vue') },
  { path: '/email/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },

  { path: '/home', name: 'home', component: page('home.vue') },
  {
    path: '/settings',
    component: page('settings/index.vue'),
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: page('settings/profile.vue') },
      { path: 'password', name: 'settings.password', component: page('settings/password.vue') }
    ]
  },
  {path: '/dashboard', name: 'dashboard', component: page('admin/dashboard.vue')},

  // admin pages
  {path: '/admin/pages', name: 'admin-pages', component: page('admin/pages.vue')},
  {path: '/admin/page-edit/:id?', name: 'page-edit', component: page('admin/page/_id.vue')},

  // admin news
  {path: '/admin/news', name: 'admin-news', component: page('admin/news.vue')},
  {path: '/admin/news-edit/:id?', name: 'news-edit', component: page('admin/news/_id.vue')},
  {path: '/admin/news/add', name: 'admin-news-add', component: page('admin/news/add.vue')},

  // admin reviews
  {path: '/admin/reviews', name:'admin-reviews', component: page('admin/reviews.vue')},

  // admin feedback
  {path: '/admin/feedback', name: 'admin-feedback', component: page('admin/feedback.vue')},

  // admin orders
  {path: '/admin/orders', name: 'admin-orders', component: page('admin/orders.vue')},
  {path: '/admin/orders/:id', name: 'order-edit', component: page('admin/orders/_id.vue')},

  // admin menu
  {path: '/admin/menu', name: 'admin-menu', component: page('admin/menu.vue')},

  {path: '/admin/menu-categories', name: 'admin-menu-categories', component: page('admin/menu/categories.vue')},
  {path: '/admin/menu-category/add', name: 'admin-menu-category-add', component: page('admin/menu/categories/add.vue')},
  {path: '/admin/menu-category/:id?', name: 'admin-menu-category', component: page('admin/menu/categories/_id.vue')},

  {path: '/admin/menu/add', name: 'admin-menu-add', component: page('admin/menu/menu/add.vue')},
  {path: '/admin/menu/:id?', name: 'admin-menu-edit', component: page('admin/menu/menu/_id.vue')},

  // admin gallery
  {path: '/admin/gallery', name: 'admin-gallery', component: page('admin/gallery.vue')},

  // admin interior
  {path: '/admin/interior', name: 'admin-interior', component: page('admin/interior.vue')},

  // admin blocks
  {path: '/admin/blocks', name: 'admin-blocks', component: page('admin/blocks.vue')},

  // admin site images
  {path: '/admin/images', name: 'admin-images', component: page('admin/images.vue')},

  // admin paper menu
  {path: '/admin/paper', name: 'admin-paper', component: page('admin/paper.vue')},

  
  // Site pages
  { path: '/ru', name: 'mainPage___ru', component: page('mainPage.vue') },
  { path: '/', name: 'mainPage___ua', component: page('mainPage.vue') },

  // { path: '/kontseptsiya', name: 'kontseptsiya___ru', component: page('concept.vue') },
  // { path: '/ua/kontseptsiya', name: 'kontseptsiya___ua', component: page('concept.vue') },

  { path: '/ru/contacts', name: 'contacts___ru', component: page('contacts.vue') },
  { path: '/contacts', name: 'contacts___ua', component: page('contacts.vue') },

  // { path: '/dostavka', name: 'delivery___ru', component: page('delivery.vue') },
  // { path: '/ua/dostavka', name: 'delivery___ua', component: page('delivery.vue') },
  
  { path: '/ru/menu', name: 'menu___ru', component: page('menu.vue') },
  { path: '/menu', name: 'menu___ua', component: page('menu.vue') },
  
  { path: '/ru/interior', name: 'interior___ru', component: page('interior.vue') },
  { path: '/interior', name: 'interior___ua', component: page('interior.vue') },
  
  // { path: '/novosti', name: 'news___ru', component: page('news.vue') },
  // { path: '/ua/novosti', name: 'news___ua', component: page('news.vue') },
  
  // { path: '/aktsii', name: 'sale___ru', component: page('sale.vue') },
  // { path: '/ua/aktsii', name: 'sale___ua', component: page('sale.vue') },
  
  { path: '/ru/gallery', name: 'gallery___ru', component: page('gallery.vue') },
  { path: '/gallery', name: 'gallery___ua', component: page('gallery.vue') },
  
    { path: '/ru/cart', name: 'cart___ru', component: page('cart.vue') },
    { path: '/cart', name: 'cart___ua', component: page('cart.vue') },
]

export function createRouter () {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history'
  })
}
