import { Component, AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { ProjectOut } from '../../../models/project.model';
import { Service } from '../../../models/service.model';
import { ServiceService } from '../../../services/service.service';

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

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data ?? []),
      error: (err) => console.error(err),
    });
    this.serviceService.getService().subscribe({
      next: (data) => (this.service = data ?? null),
      error: (err) => console.error(err),
    });
  }

  constructor(private projectService: ProjectService,private serviceService: ServiceService,private el: ElementRef, private zone: NgZone, private router: Router) {}

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


  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
