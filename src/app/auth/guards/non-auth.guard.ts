import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AutService} from '../aut.service';

@Injectable({
  providedIn: 'root'
})

export class NonAuthGuard implements CanActivate{
  constructor(private router: Router,
              private authService: AutService) {
  }

  canActivate(): boolean {
    const user = this.authService.getLoggedUser();

    if(user){
      this.router.navigate(['announcements']);
      return false;
    }
    return true;
  }
}
