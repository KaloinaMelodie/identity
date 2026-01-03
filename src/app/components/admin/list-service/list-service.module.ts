import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListServiceComponent } from './list-service.component';
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
    declarations: [ListServiceComponent],
    exports: [ListServiceComponent],
})
export class ListServiceModule { }