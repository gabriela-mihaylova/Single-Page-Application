import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Announce} from '../post.interface';
import {AutService} from '../auth/aut.service';
import {map, subscribeOn, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {PostService} from '../post.service';
import {userError} from '@angular/compiler-cli/src/transformers/util';
import { User } from '../auth/user_model';
import {AuthServiceAnnouncelist} from '../auth/auth.service.announcelist';
import {AnnounceApplied} from '../auth/announce_applied';
import { AnnounceappliedService } from '../services/announceapplied.service';
import { AnnouncedAppied } from '../model/announced-appied.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  constructor(private authServiceUser: AutService, private postService: PostService,
              private listService: AuthServiceAnnouncelist, 
              private appliedService: AnnounceappliedService) {
  }

  @Input() announce: Announce[];
  @Input() announceApplied: boolean ;

  // @Output() announceSelected = new EventEmitter<Announce>();
  @Output() announceDeleted = new EventEmitter<number>();

  // @Input() selectedAnnounce: Announce;
  selectedAnounce: Announce;
  list: Array<Announce> = [];

  destroy$ = new Subject<boolean>();
  hasLoggedUser: boolean;
  listApplied: boolean;
  // @Output() announceLiked = new EventEmitter<Announce>();

  /* Like(event: any): void{

     this.counter ++;
     this.announceLiked.emit(this.announce);

     event.target.disabled = true;
   }
   onApply(): void{

   }*/

  ngOnInit(): void {
    this.listApplied = this.announceApplied;
    this.authServiceUser.getHasLoggedIn().pipe(takeUntil(this.destroy$)).subscribe(hasLogged => this.hasLoggedUser = hasLogged);
    //this.onSubmit();

  }

  onAnnounceSelected(announce: Announce): void {
   // console.log("Aplico a un anuncio");
    //JSON.stringify(user)

    let user = JSON.parse( localStorage.getItem('loggedUser'));

    this.selectedAnounce = announce;
    
    //console.log("anuncio", this.selectedAnounce );
    //console.log("usuario", user );
    let appied = {username: user.username, announce:announce }


     this.postService.getAnnouncements().pipe().subscribe();
     this.appliedService.post(<AnnouncedAppied>appied).pipe().subscribe();


  }

}    /*getList(): Announce{
    return JSON.parse(localStorage.getItem('list'));
  }
    onSubmit(): Announce{
    this.postService.getAnnouncements().pipe(map((stream: Announce[]) =>
      stream.find(annouce1 => annouce1.title === this.getList()?.title))).subscribe((reponse )=>{
        this.selectedAnounce = reponse;
    });
    this.list.push(this.selectedAnounce);

    return this.list;
    }

  }*/

    /*
       this.postService.getAnnouncements().pipe(map((stream: Announce[]) => stream.map(announcement => announcement.title))).
       subscribe((response) => {
        this.selectedAnounce.title = response;*/
