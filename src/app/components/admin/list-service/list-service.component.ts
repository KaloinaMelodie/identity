import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'div[app-admin-list-service]',
  standalone: false,
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css',
})
export class ListServiceComponent implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = [];

  isLoading = false;
  error: string | null = null;

  filterContenu = '';

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.isLoading = true;
    this.error = null;

    this.serviceService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.filteredServices = [...this.services];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement des projets.';
        this.isLoading = false;
      },
    });
  }

  applyFilter(): void {
    const name = this.filterContenu.trim().toLowerCase();

    this.filteredServices = this.services.filter((p) => {
      let ok = true;

      if (name) {
        ok = ok && (p.contenu || '').toLowerCase().includes(name);
      }

      return ok;
    });
  }

  resetFilter(form: NgForm): void {
    form.resetForm();
    this.filterContenu = '';
    this.filteredServices = [...this.services];
  }

  confirmDelete(service: any): void {
  const confirmed = confirm(
    `Voulez-vous vraiment supprimer le service "${service.id}" ?`
  );

  if (!confirmed) return;

  this.deleteService(service.id);
}

private deleteService(id: string): void {
  this.serviceService.deleteService(id).subscribe({
    next: () => {
      this.services = this.services.filter(s => s.id !== id);
      this.filteredServices = this.filteredServices.filter(s => s.id !== id);
    },
    error: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression du service.");
    },
  });
}

}
