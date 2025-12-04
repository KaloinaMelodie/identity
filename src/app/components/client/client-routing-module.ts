import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '../../layouts/client/shell/shell.component';
import { HomeComponent } from './home/home.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent, 
    children: [
      { path: '', component: HomeComponent } ,
      { path: 'project', component: ProjectDetailsComponent }, //:slug
      // OR: { path: '', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
