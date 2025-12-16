import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { ProjectOut } from '../../../models/project.model';

@Component({
  selector: 'div[app-admin-list-project]',
  standalone: false,
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.css',
})
export class ListProjectComponent implements OnInit {
  projects: ProjectOut[] = [];
  filteredProjects: ProjectOut[] = [];

  isLoading = false;
  error: string | null = null;

  filterTitre = '';
  filterTechno = '';
  filterDateDebut = '';
  filterDateFin = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.isLoading = true;
    this.error = null;

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.filteredProjects = [...this.projects];
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
    const tech = this.filterTechno.trim().toLowerCase();

    const startInput = this.filterDateDebut;
    const endInput = this.filterDateFin;
    const startYear = startInput ? startInput.substring(0, 4) : '';
    const endYear = endInput ? endInput.substring(0, 4) : '';

    this.filteredProjects = this.projects.filter((p) => {
      let ok = true;

      if (name) {
        ok = ok && (p.titre || '').toLowerCase().includes(name);
      }

      if (tech) {
        const cats = (p.categories || []).join(', ').toLowerCase();
        const techs = (p.technos || []).join(', ').toLowerCase();
        ok = ok && (cats.includes(tech) || techs.includes(tech));
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
    this.filterTechno = '';
    this.filterDateDebut = '';
    this.filterDateFin = '';
    this.filteredProjects = [...this.projects];
  }
}
