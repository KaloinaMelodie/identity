import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { FooterModule } from '../footer/footer.module'; 
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, RouterModule, FooterModule, HeaderModule] 
})
export class ShellModule {} 
   