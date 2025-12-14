import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing-module';
import { HomeComponent } from './home/home.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { OwlCarouselProjectsDirective } from '../../directives/owl-carousel-projects.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@NgModule({
  declarations: [
    OwlCarouselProjectsDirective,
    HomeComponent,
    ProjectDetailsComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
