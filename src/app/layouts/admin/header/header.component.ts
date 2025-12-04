import { Component, OnDestroy } from '@angular/core';
import { AuthService, LoginResponse } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'div[app-admin-header]',
  standalone:false,
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  user: LoginResponse | null = null;
  private sub: Subscription;

  constructor(private authService: AuthService) {
    this.sub = this.authService.currentUser$.subscribe((u) => {
      this.user = u;
    });
  }

  onLogout(event: MouseEvent): void {
    event.preventDefault();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
