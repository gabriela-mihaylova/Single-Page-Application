import {Component, Input, OnInit} from '@angular/core';
import {Announce} from '../post.interface';
import {PostService} from '../post.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthServiceOrganization} from '../auth/auth.service.organization';

@Component({
  selector: 'app-card-list-announce',
  templateUrl: './card-list-announce.component.html',
  styleUrls: ['./card-list-announce.component.scss']
})
export class CardListAnnounceComponent implements OnInit {

  @Input() announce: Announce[];
  @Input() announceApplied: boolean ;
  selectedAnnounce: Announce;
 announcement: Announce[];

 destroy$ = new Subject<boolean>();


  hasLoggedOrganization: boolean;
  constructor(private postService: PostService,
              private authServiceOrganization: AuthServiceOrganization) { }

  ngOnInit(): void {

    this.authServiceOrganization.getHasLoggedIn().
    pipe(takeUntil(this.destroy$)).
    subscribe(hasLogged => this.hasLoggedOrganization = hasLogged);

    this.getContent();
  }
  /*onAnnounceSubmit(announce: Announce): void{
    const newAnnounce = {
      ...announce
    };
    this.announce.push(newAnnounce);
  }
// his.announce.push(announce);
*/

  private getContent(): void {
    this.postService.getAnnouncements().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.announcement = response;
    }, (error) => {
      console.log(error);
    } );
  }

 /* onAnnounceSelected(announce: Announce): void{
    this.selectedAnnounce = announce;
  }*/
  onAnnounceDeleted(announceId: number): void{
    this.postService.deleteAnnounce(announceId).pipe(takeUntil(this.destroy$)).subscribe( _ => {
      this.getContent();
    }, (error) => {
      console.log(error);
    });
  }
}
