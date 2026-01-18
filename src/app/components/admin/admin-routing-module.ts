import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '../../layouts/admin/shell/shell.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardAdminService } from '../../guards/login-guard-admin.service';
import { ListProjectComponent } from './list-project/list-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { ListServiceComponent } from './list-service/list-service.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { CreateTechnoComponent } from './create-techno/create-techno.component';
import { ListTechnoComponent } from './list-techno/list-techno.component';
import { UpdateTechnoComponent } from './update-techno/update-techno.component';
import { CreateExperienceComponent } from './create-experience/create-experience.component';
import { ListExperienceComponent } from './list-experience/list-experience.component';
import { UpdateExperienceComponent } from './update-experience/update-experience.component';
import { CreateAwardComponent } from './create-award/create-award.component';
import { ListAwardComponent } from './list-award/list-award.component';
import { UpdateAwardComponent } from './update-award/update-award.component';

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
      { path: 'create-service', component: CreateServiceComponent },
      { path: 'list-service', component: ListServiceComponent },
      { path: 'update-service/:id', component: UpdateServiceComponent },
      { path: 'create-service', component: CreateServiceComponent },
      { path: 'list-service', component: ListServiceComponent },
      { path: 'update-service/:id', component: UpdateServiceComponent },
      { path: 'create-techno', component: CreateTechnoComponent },
      { path: 'list-techno', component: ListTechnoComponent },
      { path: 'update-techno/:id', component: UpdateTechnoComponent },
      { path: 'create-experience', component: CreateExperienceComponent },
      { path: 'list-experience', component: ListExperienceComponent },
      { path: 'update-experience/:id', component: UpdateExperienceComponent },
      { path: 'create-award', component: CreateAwardComponent },
      { path: 'list-award', component: ListAwardComponent },
      { path: 'update-award/:id', component: UpdateAwardComponent },
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
