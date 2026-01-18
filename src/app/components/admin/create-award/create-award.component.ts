import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { AwardService } from '../../../services/award.service';
import { AwardCreate, AwardImageIn, AwardLink } from '../../../models/award.model';

@Component({
  selector: 'div[app-admin-create-award]',
  standalone: false,
  templateUrl: './create-award.component.html',
  styleUrl: './create-award.component.css',
})
export class CreateAwardComponent {
  public Editor: any = ClassicEditor;

  titre = '';
  rang = 0;

  // input (base64) uniquement pour create
  image: AwardImageIn = { image: '', alt: '' };

  datedebut = '';
  datefin = '';
  chapo = '';
  contenu = '';

  liens: AwardLink[] = [{ lien: '', titre: '' }];

  // input (base64) uniquement pour create
  images: AwardImageIn[] = [{ image: '', alt: '' }];

  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(private awardService: AwardService) {}

  addLink(): void {
    this.liens.push({ lien: '', titre: '' });
  }
  removeLink(index: number): void {
    this.liens.splice(index, 1);
    if (this.liens.length === 0) this.liens.push({ lien: '', titre: '' });
  }

  addImage(): void {
    this.images.push({ image: '', alt: '' });
  }
  removeImage(index: number): void {
    this.images.splice(index, 1);
    if (this.images.length === 0) this.images.push({ image: '', alt: '' });
  }

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

  onImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images[index].image = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  }

  private parseCsv(text: string): string[] {
    return (text || '')
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);
  }

  private buildAwardPayload(): AwardCreate {
    const liens = (this.liens || []).filter(l => !!l.lien && !!l.titre);
    const images = (this.images || []).filter(i => !!i.image && !!i.alt);

    const payload: AwardCreate = {
      titre: this.titre,
      rang: this.rang,
      datedebut: this.datedebut || null,
      datefin: this.datefin || null,
      chapo: this.chapo || null,
      contenu: this.contenu || null,
      liens,
      images,
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

    const payload = this.buildAwardPayload();
    this.isSubmitting = true;

    this.awardService.createAward(payload).subscribe({
      next: (created) => {
        this.isSubmitting = false;
        this.submitSuccess = 'Award créé avec succès (id : ' + (created.id || '') + ').';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la création du award.';
        console.error(err);
      },
    });
  }
}
