import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ProjectService } from '../../../services/project.service';
import {
  ProjectImageIn,
  ProjectLink,
  ProjectOut,
  ProjectUpdate,
} from '../../../models/project.model';

@Component({
  selector: 'div[app-admin-update-project]',
  standalone: false,
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css',
})
export class UpdateProjectComponent implements OnInit {
  public Editor: any = ClassicEditor;

  projectId = '';

  titre = '';
  rang = 0;

  // input (base64) si updateImage = true
  image: ProjectImageIn = { image: '', alt: '' };

  categoriesText = '';
  technosText = '';
  datedebut = '';
  datefin = '';
  soustitre = '';
  chapo = '';
  contenu = '';

  updateImages = false;
  updateImage = false;

  liens: ProjectLink[] = [{ lien: '', titre: '' }];

  // input (base64) si updateImages = true
  images: ProjectImageIn[] = [{ image: '', alt: '' }];

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
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.submitError = 'Aucun identifiant de projet fourni.';
      return;
    }
    this.projectId = id;
    this.loadProject();
  }

  private loadProject(): void {
    this.isLoading = true;
    this.submitError = null;

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project: ProjectOut) => {
        this.isLoading = false;
        this.populateForm(project);
      },
      error: (err) => {
        this.isLoading = false;
        this.submitError = 'Erreur lors du chargement du projet.';
        console.error(err);
      },
    });
  }

  private populateForm(project: ProjectOut): void {
    this.titre = project.titre || '';
    this.rang = project.rang || 0;

    this.currentMainImageUrl = project.image?.url ?? null;
    this.image = project.image ? { image: '', alt: project.image.alt } : { image: '', alt: '' };

    this.soustitre = project.soustitre || '';
    this.chapo = project.chapo || '';
    this.contenu = project.contenu || '';

    this.datedebut = project.datedebut || '';
    this.datefin = project.datefin || '';

    this.categoriesText = (project.categories || []).join(', ');
    this.technosText = (project.technos || []).join(', ');

    this.liens = (project.liens && project.liens.length > 0)
      ? project.liens.map(l => ({ ...l }))
      : [{ lien: '', titre: '' }];

    // on pré-remplit seulement alt, base64 reste vide tant que tu ne re-sélectionnes pas
    this.currentGalleryUrls = (project.images || []).map(i => i.url);
    this.images = (project.images && project.images.length > 0)
      ? project.images.map(i => ({ image: '', alt: i.alt }))
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

  private buildProjectPayload(): ProjectUpdate {
    const liens = (this.liens || []).filter(l => !!l.lien && !!l.titre);

    const payload: ProjectUpdate = {
      titre: this.titre,
      rang: this.rang,
      categories: this.parseCsv(this.categoriesText),
      technos: this.parseCsv(this.technosText),
      datedebut: this.datedebut || null,
      datefin: this.datefin || null,
      soustitre: this.soustitre || null,
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

    const payload = this.buildProjectPayload();
    this.isSubmitting = true;

    this.projectService.updateProject(this.projectId, payload).subscribe({
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
    this.router.navigate(['/admin/projects']);
  }
}
