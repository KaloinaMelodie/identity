import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ServiceService } from '../../../services/service.service';
import { ServiceCreate } from '../../../models/service.model';

@Component({
  selector: 'div[app-admin-create-service]',
  standalone: false,
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css',
})
export class CreateServiceComponent {
  public Editor: any = ClassicEditor;

  contenu = '';

  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(private serviceService: ServiceService) {}

  private buildServicePayload(): ServiceCreate {

    const payload: ServiceCreate = {
      contenu: this.contenu || null,
      
    };

    return payload;
  }

  onSubmit(): void {
    this.submitError = null;
    this.submitSuccess = null;

    const payload = this.buildServicePayload();
    this.isSubmitting = true;

    this.serviceService.createService(payload).subscribe({
      next: (created) => {
        this.isSubmitting = false;
        this.submitSuccess = 'Projet créé avec succès (id : ' + (created.id || '') + ').';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la création du projet.';
        console.error(err);
      },
    });
  }
}
