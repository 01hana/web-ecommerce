import type { NavigationMenuItem } from '@nuxt/ui';

export const sideMenu = [
  {
    label: 'menu.index',
    name: 'index',
    to: '/',
  },
  {
    label: 'menu.products',
    name: 'products',
    to: '/products',
    children: [
      {
        label: 'menu.products-top',
        name: 'products-top',
        to: '/products/top',
      },
      {
        label: 'menu.products-bottom',
        name: 'products-bottom',
        to: '/products/bottom',
      },
    ],
  },
] satisfies NavigationMenuItem[];
