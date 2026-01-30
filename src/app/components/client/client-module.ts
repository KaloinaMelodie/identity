import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing-module';
import { HomeComponent } from './home/home.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { OwlCarouselProjectsDirective } from '../../directives/owl-carousel-projects.directive';
import { OwlCarouselTechnosDirective } from '../../directives/owl-carousel-technos.directive';
import { OwlCarouselExperiencesDirective } from '../../directives/owl-carousel-experiences.directive';
import { OwlCarouselAwardsDirective } from '../../directives/owl-carousel-awards.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    OwlCarouselProjectsDirective,
    OwlCarouselAwardsDirective,
    OwlCarouselExperiencesDirective,
    OwlCarouselTechnosDirective,
    HomeComponent,
    ProjectDetailsComponent,
    SafeHtmlPipe  
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
        FormsModule,
        ReactiveFormsModule, 
        CKEditorModule
  ]
})
export class ClientModule { }
