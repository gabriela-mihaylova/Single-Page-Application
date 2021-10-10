import {Component, Input, OnInit} from '@angular/core';
import {Announce} from '../post.interface';
import {PostService} from '../post.service';
import {User} from '../auth/user_model';
import {AutService} from '../auth/aut.service';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
 @Input() announce: Announce[];
  selectedAnnounce: Announce;

  constructor(private postService: PostService, private authService: AutService) {

  }

  ngOnInit(): void {
   /* this.postService.getPosts().subscribe((response) => {
      this.announce = response;
    }, (error) => {
      console.log(error);
    });

    this.authService.getUsers().subscribe((response) => {
      this.user = response;
    }, (error ) => {
      console.log(error);
    });
*/

  }
onPostSelected(announcement: Announce): void{
    this.selectedAnnounce = announcement;
}




}
