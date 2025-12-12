import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing-module';
import { HomeComponent } from './home/home.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { OwlCarouselProjectsDirective } from '../../directives/owl-carousel-projects.directive';

@NgModule({
  declarations: [
    OwlCarouselProjectsDirective,
    HomeComponent,
    ProjectDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
