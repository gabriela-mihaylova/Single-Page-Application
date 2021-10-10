import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Announce} from '../post.interface';
import {PostService} from '../post.service';
import {User} from '../auth/user_model';
import {AuthServiceOrganization} from '../auth/auth.service.organization';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AutService} from '../auth/aut.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-list-organization',
  templateUrl: './card-list-organization.component.html',
  styleUrls: ['./card-list-organization.component.scss']
})
export class CardListOrganizationComponent  implements OnInit, OnDestroy{
  // announce: Announce[];

  @Input() announcement: Announce;
  @Input() announceApplied: boolean ;

  @Output() selectedAnnounce = new EventEmitter<Announce>();
 // @Output() selectedAnnounceForEdit = new EventEmitter<Announce>();
  @Output() announceDeleted = new EventEmitter<number>();
 // selectedAnnounce: Announce;
   //listApplied: boolean;


  hasLoggedOrganization: boolean;
  hasLoggedUser: boolean;
  destroy$ = new Subject<boolean>();

  constructor(private postService: PostService,
              private authService: AuthServiceOrganization,
              private authServiceUser: AutService,
              private router: Router
     ) {
  }

ngOnInit(): void{
  //this.listApplied = this.announceApplied
  //console.log(this.listApplied);
   /* this.post.getPosts().subscribe((response) => {
      this.announcement = response;
    }, (error) => {
      console.log(error);
    });
*/
    this.authService.getHasLoggedIn().pipe(takeUntil(this.destroy$)).subscribe(hasLogged => this.hasLoggedOrganization = hasLogged);
    this.authServiceUser.getHasLoggedIn().pipe(takeUntil(this.destroy$)).subscribe(hasLogged => this.hasLoggedUser = hasLogged);


}

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

  }
  applyNow(): void{

    this.selectedAnnounce.emit(this.announcement);
  }
  onClick(event: any): void{

     event.target.disabled =  true;

  }

  /*onEdit(): void{
    this.selectedAnnounceForEdit.emit(this.announcement);

  }*/

}
