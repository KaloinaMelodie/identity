import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { AwardService } from '../../../services/award.service';
import {
  AwardImageIn,
  AwardLink,
  AwardOut,
  AwardUpdate,
} from '../../../models/award.model';

@Component({
  selector: 'div[app-admin-update-award]',
  standalone: false,
  templateUrl: './update-award.component.html',
  styleUrl: './update-award.component.css',
})
export class UpdateAwardComponent implements OnInit {
  public Editor: any = ClassicEditor;

  awardId = '';

  titre = '';
  rang = 0;

  // input (base64) si updateImage = true
  image: AwardImageIn = { image: '', alt: '' };

  datedebut = '';
  datefin = '';
  chapo = '';
  contenu = '';

  updateImages = false;
  updateImage = false;

  liens: AwardLink[] = [{ lien: '', titre: '' }];

  // input (base64) si updateImages = true
  images: AwardImageIn[] = [{ image: '', alt: '' }];

  // juste pour afficher ce qui existe déjà (si tu veux plus tard)
  currentMainImageUrl: string | null = null;
  currentGalleryUrls: string[] = [];

  isLoading = false;
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private awardService: AwardService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.submitError = 'Aucun identifiant de award fourni.';
      return;
    }
    this.awardId = id;
    this.loadAward();
  }

  private loadAward(): void {
    this.isLoading = true;
    this.submitError = null;

    this.awardService.getAwardById(this.awardId).subscribe({
      next: (award: AwardOut) => {
        this.isLoading = false;
        this.populateForm(award);
      },
      error: (err) => {
        this.isLoading = false;
        this.submitError = 'Erreur lors du chargement du award.';
        console.error(err);
      },
    });
  }

  private populateForm(award: AwardOut): void {
    this.titre = award.titre || '';
    this.rang = award.rang || 0;

    this.currentMainImageUrl = award.image?.url ?? null;
    this.image = award.image ? { image: '', alt: award.image.alt } : { image: '', alt: '' };

    this.chapo = award.chapo || '';
    this.contenu = award.contenu || '';

    this.datedebut = award.datedebut || '';
    this.datefin = award.datefin || '';

    this.liens = (award.liens && award.liens.length > 0)
      ? award.liens.map(l => ({ ...l }))
      : [{ lien: '', titre: '' }];

    // on pré-remplit seulement alt, base64 reste vide tant que tu ne re-sélectionnes pas
    this.currentGalleryUrls = (award.images || []).map(i => i.url);
    this.images = (award.images && award.images.length > 0)
      ? award.images.map(i => ({ image: '', alt: i.alt }))
      : [{ image: '', alt: '' }];
  }

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

  private buildAwardPayload(): AwardUpdate {
    const liens = (this.liens || []).filter(l => !!l.lien && !!l.titre);

    const payload: AwardUpdate = {
      titre: this.titre,
      rang: this.rang,
      datedebut: this.datedebut || null,
      datefin: this.datefin || null,
      chapo: this.chapo || null,
      contenu: this.contenu || null,
      liens,
    };

    if (this.updateImage) {
      // si switch ON, on envoie seulement si un fichier a été choisi
      if (this.image.image) {
        payload.image = { image: this.image.image, alt: this.image.alt || '' };
      }
    }

    if (this.updateImages) {
      // idem: on envoie uniquement les éléments qui ont un fichier sélectionné
      const images = (this.images || []).filter(i => !!i.image && !!i.alt);
      payload.images = images;
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

    this.awardService.updateAward(this.awardId, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = 'Award mis à jour avec succès.';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la mise à jour du award.';
        console.error(err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/list-award']);
  }
}
