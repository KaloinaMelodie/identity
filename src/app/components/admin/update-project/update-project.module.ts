import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProjectComponent } from './update-project.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        CKEditorModule
    ],
    declarations: [UpdateProjectComponent],
    exports: [UpdateProjectComponent],
})
export class UpdateProjectModule { }