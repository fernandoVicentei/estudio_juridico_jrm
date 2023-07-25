import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory ,  } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
      },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
          },
        ],
      },
      {
        path:'/abogados',
        name: 'Abogados',
        component: () => import('@/views/m_abogados/index.vue'),
      },
      {
        path:'/clientes',
        name: 'Clientes',
        component: () => import('@/views/m_clientes/index.vue'),
      },
      {
        path:'/tramites',
        name: 'Tramites',
        component: () => import('@/views/m_tramites/index.vue'),
      },
      {
        path: '/tramites/registrar',
        name: 'RegistrarTramite',
        component: () => import('@/views/m_tramites/componentes/registrar.vue'),
      },
      {
        path: '/tramites/actualizar/:idTramite',
        name: 'EditarTramite',
        component: () => import('@/views/m_tramites/componentes/registrar.vue'),
      },

    ],
  },

]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})


export default router
