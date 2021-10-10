import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AutService} from '../aut.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard /*implements CanActivate*/{
/*constructor(private authService: AutService,
            private router : Router) {
}

  canActivate(): boolean {
  const user = this.authService.getLoggedUser();
  if(!user){
    this.router.navigate(['login']);
    return false;
  }
  return true;


  }*/
}

