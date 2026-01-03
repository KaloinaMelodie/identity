import { Component, AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { ProjectOut } from '../../../models/project.model';
import { Service } from '../../../models/service.model';
import { ServiceService } from '../../../services/service.service';
import { TechnoService } from '../../../services/techno.service';
import { TechnoGroupOut } from '../../../models/techno.model';
import { environment } from '../../../../environments/environment';

declare global { interface Window { AppInit?: { init(root?: HTMLElement): void } } }

@Component({
  selector: 'div[app-home]',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private sub?: Subscription;

  projects: ProjectOut[] = [];

  service: Service | null = null;

  technoGroups: TechnoGroupOut[] = [];
  isTechnoLoading = false;

  private baseUrl = environment.apiUrl;

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data ?? []),
      error: (err) => console.error(err),
    });
    this.serviceService.getService().subscribe({
      next: (data) => (this.service = data ?? null),
      error: (err) => console.error(err),
    });
    this.loadTechnoGroups();
  }

  constructor(private projectService: ProjectService,private serviceService: ServiceService,private technoService: TechnoService,private el: ElementRef, private zone: NgZone, private router: Router) {}

  ngAfterViewInit(): void { 
    this.zone.runOutsideAngular(() => window.AppInit?.init(this.el.nativeElement));
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.zone.runOutsideAngular(() => window.AppInit?.init(this.el.nativeElement)));
  }

  categoriesToString(categories?: string[] | null): string {
    return (categories ?? []).filter(Boolean).join(', ');
  }

  dateRange(p: ProjectOut): string {
    const start = p.datedebut?.trim();
    const end = p.datefin?.trim();

    if (start && end) return `${start} - ${end}`;
    if (start) return start;
    if (end) return end;
    return '';
  }

    toSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  projectSlugId(project: any): string {
    return `${this.toSlug(project.titre)}-${project.id}`;
  }

   loadTechnoGroups(): void {
    this.isTechnoLoading = true;
    this.technoService.getGroupedTechnos().subscribe({
      next: (groups) => {
        this.technoGroups = groups ?? [];
        this.isTechnoLoading = false;

        // si tu utilises owl-carousel, il faut ré-init après render
        setTimeout(() => this.reinitTechnoCarousel(), 0);
      },
      error: (err) => {
        console.error(err);
        this.isTechnoLoading = false;
        this.technoGroups = [];
      },
    });
  }

  imageUrl(url?: string | null): string {
    return this.baseUrl+(url ?? '').trim();
  }

  private reinitTechnoCarousel(): void {
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
