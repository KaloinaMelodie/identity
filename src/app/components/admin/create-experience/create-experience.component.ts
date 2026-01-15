import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ExperienceService } from '../../../services/experience.service';
import { ExperienceCreate, ExperienceLink } from '../../../models/experience.model';

@Component({
  selector: 'div[app-admin-create-experience]',
  standalone: false,
  templateUrl: './create-experience.component.html',
  styleUrl: './create-experience.component.css',
})
export class CreateExperienceComponent {
  public Editor: any = ClassicEditor;

  titre = '';
  rang = 0;

  organisation = '';
  datedebut = '';
  datefin = '';
  chapo = '';
  contenu = '';

  liens: ExperienceLink[] = [{ lien: '', titre: '' }];


  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(private experienceService: ExperienceService) {}

  addLink(): void {
    this.liens.push({ lien: '', titre: '' });
  }
  removeLink(index: number): void {
    this.liens.splice(index, 1);
    if (this.liens.length === 0) this.liens.push({ lien: '', titre: '' });
  }



  private buildExperiencePayload(): ExperienceCreate {
    const liens = (this.liens || []).filter(l => !!l.lien && !!l.titre);

    const payload: ExperienceCreate = {
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

    this.experienceService.createExperience(payload).subscribe({
      next: (created) => {
        this.isSubmitting = false;
        this.submitSuccess = 'Experience créé avec succès (id : ' + (created.id || '') + ').';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la création du experience.';
        console.error(err);
      },
    });
  }
}
