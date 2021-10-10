import {Component, OnDestroy, OnInit} from '@angular/core';
import {AutService} from '../auth/aut.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthServiceOrganization} from '../auth/auth.service.organization';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  hasLoggedIn: boolean;
  hasLoggedOrganization: boolean;
  destroy$ = new Subject<boolean>();

  constructor(private authService: AutService,
              private authServiceOrganization: AuthServiceOrganization,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.getHasLoggedIn().pipe(takeUntil(this.destroy$)).
    subscribe(hasLogged => this.hasLoggedIn = hasLogged);
    this.authServiceOrganization.getHasLoggedIn().
    pipe(takeUntil(this.destroy$)).
    subscribe(hasLogged => this.hasLoggedOrganization = hasLogged);

  }
ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
}

  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['login']);
  }
  onLogoutOrganization(): void{
    this.authServiceOrganization.logout();
    this.router.navigate(['loginOrganization']);
  }
}
