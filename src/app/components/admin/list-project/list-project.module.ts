import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProjectComponent } from './list-project.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        CKEditorModule,
        RouterModule,  
    ],
    declarations: [ListProjectComponent],
    exports: [ListProjectComponent],
})
export class ListProjectModule { }