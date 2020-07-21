import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private service: AuthService, private router: Router) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.service.getUser().pipe(
      map(user => {
        if (!!user) {
          return true;
        }

        this.service.redirectUrl = _state?.url || '/';

        return this.router.createUrlTree(['/login']);
      })
    );
  }

  canLoad(_route: Route, _segments: UrlSegment[]) {
    return this.canActivate(null, null);
  }
}
