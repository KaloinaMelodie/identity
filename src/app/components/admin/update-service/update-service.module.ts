import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateServiceComponent } from './update-service.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        CKEditorModule
    ],
    declarations: [UpdateServiceComponent],
    exports: [UpdateServiceComponent],
})
export class UpdateServiceModule { }