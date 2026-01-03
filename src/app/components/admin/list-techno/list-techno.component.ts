import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TechnoService } from '../../../services/techno.service';
import { TechnoOut } from '../../../models/techno.model';

@Component({
  selector: 'div[app-admin-list-techno]',
  standalone: false,
  templateUrl: './list-techno.component.html',
  styleUrl: './list-techno.component.css',
})
export class ListTechnoComponent implements OnInit {
  technos: TechnoOut[] = [];
  filteredTechnos: TechnoOut[] = [];

  isLoading = false;
  error: string | null = null;

  filterTitre = '';

  constructor(private technoService: TechnoService) {}

  ngOnInit(): void {
    this.loadTechnos();
  }

  private loadTechnos(): void {
    this.isLoading = true;
    this.error = null;

    this.technoService.getTechnos().subscribe({
      next: (technos) => {
        this.technos = technos;
        this.filteredTechnos = [...this.technos];
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
    const name = this.filterTitre.trim().toLowerCase();


    this.filteredTechnos = this.technos.filter((p) => {
      let ok = true;

      if (name) {
        ok = ok && (p.titre || '').toLowerCase().includes(name);
      }


      return ok;
    });
  }

  resetFilter(form: NgForm): void {
    form.resetForm();
    this.filterTitre = '';
    this.filteredTechnos = [...this.technos];
  }

  
  confirmDelete(techno: any): void {
  const confirmed = confirm(
    `Voulez-vous vraiment supprimer le techno "${techno.titre}" ?`
  );

  if (!confirmed) return;

  this.deleteTechno(techno.id);
}

private deleteTechno(id: string): void {
  this.technoService.deleteTechno(id).subscribe({
    next: () => {
      this.technos = this.technos.filter(s => s.id !== id);
      this.filteredTechnos = this.filteredTechnos.filter(s => s.id !== id);
    },
    error: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression du service.");
    },
  });
}
}
