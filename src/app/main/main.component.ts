import { Component, OnInit } from '@angular/core';
import { Announce } from '../post.interface';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  announcement: Announce[];

  constructor() {
   /* this.announcement = [
      {
        id: 1,
        title: 'Junior Developer',
        description: '',
        likes: 2,
        type: 'part-time',
        category: 'We are searching a Java Junior Developer'
      }
    ];*/

  }

  ngOnInit(): void {
  }

}
