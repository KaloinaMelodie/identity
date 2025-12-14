import { Component, AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import {ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

declare global { interface Window { AppInit?: { init(root?: HTMLElement): void } } }

@Component({
  selector: 'div[app-project-details]',
  standalone: false,
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
}) 
export class ProjectDetailsComponent  implements AfterViewInit, OnDestroy {
  private sub?: Subscription;
 project: Project | null = null;
  relatedProjects: Project[] = [];
  loading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,private el: ElementRef, private zone: NgZone, private router: Router) {}
  
    ngOnInit(): void {
      const s = this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.loading = true;
          this.errorMessage = '';
          this.project = null;

          const slugId = params.get('slugId') ?? '';
          const id = this.extractIdFromSlugId(slugId);

          if (!id) {
            this.loading = false;
            this.errorMessage = 'Identifiant de projet invalide dans l’URL.';
            throw new Error('Invalid project id');
          }

          // Charger le projet
          return this.projectService.getProjectById(id);
        })
      )
      .subscribe({
        next: (p) => {
          this.project = p ?? null;
          this.loading = false;

          // Charger "voir aussi"
          const currentId = this.project?.id ?? '';
          this.projectService.getProjects().subscribe({
            next: (all) => {
              this.relatedProjects = (all ?? [])
                .filter((x) => (x.id ?? '') !== currentId)
                .slice(0, 3);
            },
            error: () => {
              this.relatedProjects = [];
            },
          });
        },
        error: () => {
          if (!this.errorMessage) this.errorMessage = 'Impossible de charger le projet.';
          this.loading = false;
        },
      });

    this.sub?.add(s);
    }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => window.AppInit?.init(this.el.nativeElement));
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.zone.runOutsideAngular(() => window.AppInit?.init(this.el.nativeElement)));
  }

  ngOnDestroy(): void { 
    this.sub?.unsubscribe();
   }

    private extractIdFromSlugId(slugId: string): string {
    // Cas Mongo ObjectId (24 hex) en fin de chaîne
    const mongoMatch = slugId.match(/-([a-f0-9]{24})$/i);
    if (mongoMatch?.[1]) return mongoMatch[1];

    // Fallback: prendre ce qu'il y a après le dernier "-"
    const idx = slugId.lastIndexOf('-');
    if (idx === -1) return '';
    return slugId.substring(idx + 1).trim();
  }

  categoriesToString(categories?: string[] | null): string {
    return (categories ?? []).filter(Boolean).join(', ');
  }

  technosToString(technos?: string[] | null): string {
    return (technos ?? []).filter(Boolean).join(', ');
  }

  dateRange(p: Project): string {
    const start = (p.datedebut ?? '').trim();
    const end = (p.datefin ?? '').trim();
    if (start && end) return `${start} - ${end}`;
    if (start) return start;
    if (end) return end;
    return '';
  }

  imageSrc(img?: string | null): string {
    const v = (img ?? '').trim();
    if (!v) return '';
    // si c’est déjà une URL ou un data URL
    if (v.startsWith('http') || v.startsWith('assets/') || v.startsWith('data:')) return v;
    // sinon on suppose base64 png
    return `data:image/png;base64,${v}`;
  }

  toSlug(title: string | null | undefined): string {
  const t = (title ?? 'project').trim();
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

projectSlugId(p: { titre?: string | null; id?: string | null }): string {
  const id = (p.id ?? '').trim();
  return `${this.toSlug(p.titre)}-${id}`;
}

}
