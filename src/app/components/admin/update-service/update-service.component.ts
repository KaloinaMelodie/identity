import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ServiceService } from '../../../services/service.service';
import {
  Service,
  ServiceUpdate,
} from '../../../models/service.model';

@Component({
  selector: 'div[app-admin-update-service]',
  standalone: false,
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.css',
})
export class UpdateServiceComponent implements OnInit {
  public Editor: any = ClassicEditor;

  serviceId = '';

  contenu = '';

  isLoading = false;
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.submitError = 'Aucun identifiant de service fourni.';
      return;
    }
    this.serviceId = id;
    this.loadService();
  }

  private loadService(): void {
    this.isLoading = true;
    this.submitError = null;

    this.serviceService.getServiceById(this.serviceId).subscribe({
      next: (service: Service) => {
        this.isLoading = false;
        this.populateForm(service);
      },
      error: (err) => {
        this.isLoading = false;
        this.submitError = 'Erreur lors du chargement du service.';
        console.error(err);
      },
    });
  }

  private populateForm(service: Service): void {
    this.contenu = service.contenu || '';

  }


  private buildServicePayload(): ServiceUpdate {

    const payload: ServiceUpdate = {
    
      contenu: this.contenu || null,
    };

    return payload;
  }

  onSubmit(): void {
    this.submitError = null;
    this.submitSuccess = null;


    const payload = this.buildServicePayload();
    this.isSubmitting = true;

    this.serviceService.updateService(this.serviceId, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = 'Service mis à jour avec succès.';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la mise à jour du service.';
        console.error(err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/list-service']);
  }
}
