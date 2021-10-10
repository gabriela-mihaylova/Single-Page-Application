import { Component, OnInit, Input } from '@angular/core';
import { AnnounceappliedService } from '../services/announceapplied.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Announce } from '../model/announce.model';

@Component({
  selector: 'app-car-list-announce-applied',
  templateUrl: './car-list-announce-applied.component.html',
  styles: [
  ]
})
export class CarListAnnounceAppliedComponent implements OnInit {
  
  @Input() announceApplied: boolean ;
  destroy$ = new Subject<boolean>();
  announcement: Announce[];
  listApplied: boolean;
  
  constructor(private announceappliedService:AnnounceappliedService) { }

  ngOnInit(): void {
 
    this.getContent();
  }

  private getContent(): void {
    this.announceappliedService.getAnnouncements().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      
      console.log('Anuncions del usuario: ', response);
      let _announcement = [];
      response.forEach( (element) =>{
     
        _announcement.push(element.announce);
        //console.log('elemento: ',element);
      });
      this.announcement = _announcement;
      //console.log('announce: ',this.announcement);
      //this.announcement = response;
    }, (error) => {
      console.log(error);
    } );

  }
}
