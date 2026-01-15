import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../models/experience.model';

@Component({
  selector: 'div[app-admin-list-experience]',
  standalone: false,
  templateUrl: './list-experience.component.html',
  styleUrl: './list-experience.component.css',
})
export class ListExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  filteredExperiences: Experience[] = [];

  isLoading = false;
  error: string | null = null;

  filterTitre = '';
  filterDateDebut = '';
  filterDateFin = '';

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  private loadExperiences(): void {
    this.isLoading = true;
    this.error = null;

    this.experienceService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.filteredExperiences = [...this.experiences];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement des experiences.';
        this.isLoading = false;
      },
    });
  }

  applyFilter(): void {
    const name = this.filterTitre.trim().toLowerCase();

    const startInput = this.filterDateDebut;
    const endInput = this.filterDateFin;
    const startYear = startInput ? startInput.substring(0, 4) : '';
    const endYear = endInput ? endInput.substring(0, 4) : '';

    this.filteredExperiences = this.experiences.filter((p) => {
      let ok = true;

      if (name) {
        ok = ok && (p.titre || '').toLowerCase().includes(name);
      }

      if (startYear) {
        ok = ok && (p.datedebut || '').includes(startYear);
      }

      if (endYear) {
        const dateFinOrDebut = p.datefin || p.datedebut || '';
        ok = ok && dateFinOrDebut.includes(endYear);
      }

      return ok;
    });
  }

  resetFilter(form: NgForm): void {
    form.resetForm();
    this.filterTitre = '';
    this.filterDateDebut = '';
    this.filterDateFin = '';
    this.filteredExperiences = [...this.experiences];
  }

  
  confirmDelete(experience: any): void {
  const confirmed = confirm(
    `Voulez-vous vraiment supprimer le experience "${experience.titre}" ?`
  );

  if (!confirmed) return;

  this.deleteExperience(experience.id);
}

private deleteExperience(id: string): void {
  this.experienceService.deleteExperience(id).subscribe({
    next: () => {
      this.experiences = this.experiences.filter(s => s.id !== id);
      this.filteredExperiences = this.filteredExperiences.filter(s => s.id !== id);
    },
    error: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression du service.");
    },
  });
}
}
