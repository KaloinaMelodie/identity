import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AwardService } from '../../../services/award.service';
import { AwardOut } from '../../../models/award.model';

@Component({
  selector: 'div[app-admin-list-award]',
  standalone: false,
  templateUrl: './list-award.component.html',
  styleUrl: './list-award.component.css',
})
export class ListAwardComponent implements OnInit {
  awards: AwardOut[] = [];
  filteredAwards: AwardOut[] = [];

  isLoading = false;
  error: string | null = null;

  filterTitre = '';
  filterDateDebut = '';
  filterDateFin = '';

  constructor(private awardService: AwardService) {}

  ngOnInit(): void {
    this.loadAwards();
  }

  private loadAwards(): void {
    this.isLoading = true;
    this.error = null;

    this.awardService.getAwards().subscribe({
      next: (awards) => {
        this.awards = awards;
        this.filteredAwards = [...this.awards];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement des awards.';
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

    this.filteredAwards = this.awards.filter((p) => {
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
    this.filteredAwards = [...this.awards];
  }

  
  confirmDelete(award: any): void {
  const confirmed = confirm(
    `Voulez-vous vraiment supprimer le award "${award.titre}" ?`
  );

  if (!confirmed) return;

  this.deleteAward(award.id);
}

private deleteAward(id: string): void {
  this.awardService.deleteAward(id).subscribe({
    next: () => {
      this.awards = this.awards.filter(s => s.id !== id);
      this.filteredAwards = this.filteredAwards.filter(s => s.id !== id);
    },
    error: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression du service.");
    },
  });
}
}
