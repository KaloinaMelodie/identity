import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardAdminService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/admin/login'], {
        queryParams: { returnUrl: state.url }
      });
    }

    const requiredUserType = route.data['userType'] as string | undefined;
    if (requiredUserType) {
      const user = this.authService.getUser();
    }

    return true;
  }
}
