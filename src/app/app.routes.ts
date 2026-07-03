import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'contactlist',
    loadComponent: () => import('./contactlist/contactlist.page').then( m => m.ContactlistPage)
  },
  {
    path: 'chat-status',
    loadComponent: () => import('./chat-status/chat-status.page').then( m => m.ChatStatusPage)
  },
];
