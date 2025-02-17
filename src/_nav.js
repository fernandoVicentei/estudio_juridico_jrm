export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Abogados',
    to: '/abogados',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Clientes',
    to: '/clientes',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Tramites',
    to: '/tramites',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'TipoTramite',
    to: '/tramites/tipotramites',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Juzgados',
    to: '/juzgado/',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Reuniones',
    to: '/reuniones/',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavGroup',
    name: 'Notifications',
    to: '/notifications',
    icon: 'cil-bell',
    items: [
      {
        component: 'CNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: 'CNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: 'CNavItem',
        name: 'Modals',
        to: '/notifications/modals',
      },
    ],

  },
]
