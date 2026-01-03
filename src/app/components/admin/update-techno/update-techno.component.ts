import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { TechnoService } from '../../../services/techno.service';
import {
  TechnoImageIn,
  TechnoOut,
  TechnoUpdate,
} from '../../../models/techno.model';

@Component({
  selector: 'div[app-admin-update-techno]',
  standalone: false,
  templateUrl: './update-techno.component.html',
  styleUrl: './update-techno.component.css',
})
export class UpdateTechnoComponent implements OnInit {
  public Editor: any = ClassicEditor;

  technoId = '';

  titre = '';

  // input (base64) si updateImage = true
  image: TechnoImageIn = { image: '', alt: '' };

  categorie: string = '';

  chapo = '';

  updateImage = false;

  // juste pour afficher ce qui existe déjà (si tu veux plus tard)
  currentMainImageUrl: string | null = null;

  isLoading = false;
  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private technoService: TechnoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.submitError = 'Aucun identifiant de projet fourni.';
      return;
    }
    this.technoId = id;
    this.loadTechno();
  }

  private loadTechno(): void {
    this.isLoading = true;
    this.submitError = null;

    this.technoService.getTechnoById(this.technoId).subscribe({
      next: (techno: TechnoOut) => {
        this.isLoading = false;
        this.populateForm(techno);
      },
      error: (err) => {
        this.isLoading = false;
        this.submitError = 'Erreur lors du chargement du projet.';
        console.error(err);
      },
    });
  }

  private populateForm(techno: TechnoOut): void {
    this.titre = techno.titre || '';

    this.currentMainImageUrl = techno.image?.url ?? null;
    this.image = techno.image ? { image: '', alt: techno.image.alt } : { image: '', alt: '' };

    this.chapo = techno.chapo || '';
    this.categorie = techno.categorie || '';

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


  private buildTechnoPayload(): TechnoUpdate {

    const payload: TechnoUpdate = {
      titre: this.titre,
      chapo: this.chapo || null,
      categorie: this.categorie
    };

    if (this.updateImage) {
      // si switch ON, on envoie seulement si un fichier a été choisi
      if (this.image.image) {
        payload.image = { image: this.image.image, alt: this.image.alt || '' };
      }
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

    this.technoService.updateTechno(this.technoId, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = 'Projet mis à jour avec succès.';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la mise à jour du projet.';
        console.error(err);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/list-techno']);
  }
}
