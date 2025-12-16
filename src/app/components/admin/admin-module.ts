import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; 
import { HomeModule } from './home/home.module';
import { ListProjectModule } from './list-project/list-project.module';
import { UpdateProjectModule } from './update-project/update-project.module';
import { CreateServiceModule } from './create-service/create-service.module';
import { ListServiceModule } from './list-service/list-service.module';
import { UpdateServiceModule } from './update-service/update-service.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule,
    CreateServiceModule,
    ListProjectModule,
    ListServiceModule,
    UpdateProjectModule,
    UpdateServiceModule,
    FormsModule,
    
  ]
})
export class AdminModule { }
