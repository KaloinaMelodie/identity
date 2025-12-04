import { Component, AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

declare global { interface Window { AppInit?: { init(root?: HTMLElement): void } } }

@Component({
  selector: 'div[app-project-details]',
  standalone: false,
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
}) 
export class ProjectDetailsComponent  implements AfterViewInit, OnDestroy {
  private sub?: Subscription;

  constructor(private el: ElementRef, private zone: NgZone, private router: Router) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => window.AppInit?.init(this.el.nativeElement));
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.zone.runOutsideAngular(() => window.AppInit?.init(this.el.nativeElement)));
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
