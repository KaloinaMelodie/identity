import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ExperienceService } from '../../../services/experience.service';
import {
  ExperienceLink,
  Experience,
  ExperienceUpdate,
} from '../../../models/experience.model';

@Component({
  selector: 'div[app-admin-update-experience]',
  standalone: false,
  templateUrl: './update-experience.component.html',
  styleUrl: './update-experience.component.css',
})
export class UpdateExperienceComponent implements OnInit {
  public Editor: any = ClassicEditor;

  experienceId = '';

  titre = '';
  rang = 0;

  organisation = '';

  datedebut = '';
  datefin = '';
  chapo = '';
  contenu = '';

  liens: ExperienceLink[] = [{ lien: '', titre: '' }];

  isLoading = false;
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.submitError = 'Aucun identifiant de experience fourni.';
      return;
    }
    this.experienceId = id;
    this.loadExperience();
  }

  private loadExperience(): void {
    this.isLoading = true;
    this.submitError = null;

    this.experienceService.getExperienceById(this.experienceId).subscribe({
      next: (experience: Experience) => {
        this.isLoading = false;
        this.populateForm(experience);
      },
      error: (err) => {
        this.isLoading = false;
        this.submitError = 'Erreur lors du chargement du experience.';
        console.error(err);
      },
    });
  }

  private populateForm(experience: Experience): void {
    this.titre = experience.titre || '';
    this.rang = experience.rang || 0;
    this.organisation = experience.organisation || '';
    this.chapo = experience.chapo || '';
    this.contenu = experience.contenu || '';

    this.datedebut = experience.datedebut || '';
    this.datefin = experience.datefin || '';

    this.liens = (experience.liens && experience.liens.length > 0)
      ? experience.liens.map(l => ({ ...l }))
      : [{ lien: '', titre: '' }];

  }

  addLink(): void {
    this.liens.push({ lien: '', titre: '' });
  }
  removeLink(index: number): void {
    this.liens.splice(index, 1);
    if (this.liens.length === 0) this.liens.push({ lien: '', titre: '' });
  }


  private buildExperiencePayload(): ExperienceUpdate {
    const liens = (this.liens || []).filter(l => !!l.lien && !!l.titre);

    const payload: ExperienceUpdate = {
      titre: this.titre,
      rang: this.rang,
      organisation: this.organisation || null,
      datedebut: this.datedebut || null,
      datefin: this.datefin || null,
      chapo: this.chapo || null,
      contenu: this.contenu || null,
      liens,
    };

    return payload;
  }

  onSubmit(): void {
    this.submitError = null;
    this.submitSuccess = null;

    if (!this.titre) {
      this.submitError = 'Le titre est obligatoire.';
      return;
    }

    const payload = this.buildExperiencePayload();
    this.isSubmitting = true;

    this.experienceService.updateExperience(this.experienceId, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = 'Experience mis à jour avec succès.';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la mise à jour du experience.';
        console.error(err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/list-experience']);
  }
}
