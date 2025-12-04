import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '../../layouts/admin/shell/shell.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardAdminService } from '../../guards/login-guard-admin.service';
import { ListProjectComponent } from './list-project/list-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';

const routes: Routes = [
  {
    path: 'login',
    component: ShellComponent,
    children: [{
  path: '',
  loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
}]
}
,
  {
    path: '',
    component: ShellComponent,
    canActivate: [LoginGuardAdminService],
    data: { userType: 'admin' },
    children: [
      { path: '', component: HomeComponent },
      { path: 'list-project', component: ListProjectComponent },
      { path: 'update-project/:id', component: UpdateProjectComponent },
      // ici d’autres routes admin protégées
      // { path: 'users', component: UsersComponent, data: { userType: 'admin' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
