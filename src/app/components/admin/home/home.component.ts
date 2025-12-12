import { Component } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project, ProjectLink, ProjectImage } from '../../../models/project.model';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'div[app-admin-home]',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
   public Editor: any = ClassicEditor;
   
  titre = '';
  rang = 0;
  image: ProjectImage = { image: '', alt: '' };
  categoriesText = ''; // "IA, Backend, Data"
  technosText = ''; // "FastAPI, Milvus, MongoDB"
  datedebut = '';
  datefin = '';
  soustitre = '';
  chapo = '';
  contenu = '';

  liens: ProjectLink[] = [
    { lien: '', titre: '' },
  ];

  images: ProjectImage[] = [
    { image: '', alt: '' },
  ];

  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess: string | null = null;

  constructor(private projectService: ProjectService) {}

  addLink(): void {
    this.liens.push({ lien: '', titre: '' });
  }

  removeLink(index: number): void {
    this.liens.splice(index, 1);
  }

  addImage(): void {
    this.images.push({ image: '', alt: '' });
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  onMainImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result est du type "data:image/png;base64,AAAA..."
      this.image.image = result;
    };
    reader.readAsDataURL(file);
  }

  onImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result est du type "data:image/png;base64,AAAA..."
      this.images[index].image = result;
    };
    reader.readAsDataURL(file);
  }

  private buildProjectPayload(): Project {
    const categories = this.categoriesText
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);

    const technos = this.technosText
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);

    const liens = this.liens.filter(l => l.lien && l.titre);
    const images = this.images.filter(i => i.image && i.alt);

    const project: Project = {
      titre: this.titre,
      rang: this.rang,
      image: this.image,
      categories,
      technos,
      datedebut: this.datedebut || null,
      datefin: this.datefin || null,
      soustitre: this.soustitre || null,
      chapo: this.chapo || null,
      contenu: this.contenu || null,
      liens,
      images,
    };

    return project;
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

    this.projectService.createProject(payload).subscribe({
      next: (created) => {
        this.isSubmitting = false;
        this.submitSuccess = 'Projet créé avec succès (id : ' + (created.id || '') + ').';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = 'Erreur lors de la création du projet.';
        console.error(err);
      },
    });
  }
}
