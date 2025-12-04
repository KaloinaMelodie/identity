import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutAdminRoutingModule } from './layout-admin-routing-module';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from './header/header.module';


@NgModule({
  imports: [
    HeaderModule,
    CommonModule,
    LayoutAdminRoutingModule,
    FormsModule
  ],
  declarations: [
    ShellComponent,
    FooterComponent,
  ],
})
export class LayoutAdminModule { }
