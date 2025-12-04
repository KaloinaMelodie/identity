import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/client/client-module').then(m => m.ClientModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin-routing-module').then(m => m.AdminRoutingModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
