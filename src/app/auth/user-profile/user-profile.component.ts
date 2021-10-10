import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user_model';
import {AutService} from '../aut.service';
import {first, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']

})
export class UserProfileComponent implements OnInit {

// users: User;
  users: User;
  destroy$ = new Subject<boolean>();


  constructor(private authService: AutService) {

  }

  ngOnInit(): void {

  this.getContent();
  }
  private getContent(): void{
    // const user = this.users.find(x =>x.id === id)
     this.authService.getLoggedUser();
   // this.users = this.authService.getLoggedUser();

    /* this.authService.getUsers().pipe(takeUntil(this.destroy$))
      .subscribe((stream) => stream.find(x => x.name === this.authService.getLoggedUser().name ));*/
     this.authService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.users = response;
    });
  }

  onDelete(announceId: number): void{
    this.authService.deleteUser(announceId).pipe(takeUntil(this.destroy$)).
    subscribe(_ => {
      this.getContent();
    }, (error ) => {
      console.log(error);
    } );
  }


}
