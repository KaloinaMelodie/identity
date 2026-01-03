import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { TechnoService } from '../../../services/techno.service';
import { TechnoCreate, TechnoImageIn } from '../../../models/techno.model';

@Component({
  selector: 'div[app-admin-create-techno]',
  standalone: false,
  templateUrl: './create-techno.component.html',
  styleUrl: './create-techno.component.css',
})
export class CreateTechnoComponent {
  public Editor: any = ClassicEditor;

  titre = '';
  

  // input (base64) uniquement pour create
  image: TechnoImageIn = { image: '', alt: '' };

  chapo = '';
  categorie = '';



  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(private technoService: TechnoService) {}


  onMainImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image.image = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  }


  private buildTechnoPayload(): TechnoCreate {;

    const payload: TechnoCreate = {
      titre: this.titre,
      chapo: this.chapo || null,
      categorie: this.categorie,
    };

    // main image optionnelle
    if (this.image?.image && this.image?.alt) {
      payload.image = { image: this.image.image, alt: this.image.alt };
    } else {
      payload.image = null;
    }

    return payload;
  }

  onSubmit(): void {
    this.submitError = null;
    this.submitSuccess = null;

    if (!this.titre) {
      this.submitError = 'Le titre est obligatoire.';
      return;
    }

    const payload = this.buildTechnoPayload();
    this.isSubmitting = true;

    this.technoService.createTechno(payload).subscribe({
      next: (created) => {
        this.isSubmitting = false;
        this.submitSuccess = 'Techno créé avec succès (id : ' + (created.id || '') + ').';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la création du techno.';
        console.error(err);
      },
    });
  }
}
