import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _storage: StorageService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getDataLocal();
  }

  private async getDataLocal(): Promise<boolean> {

    const dataUser = await this._storage.getDataUser();

    const tokenUser = await this._storage.getToken();

    if (!dataUser && !tokenUser) {
      console.log(dataUser, tokenUser);
      this.router.navigate(['/auth']);
      return false
    }

    return true
  }

}
