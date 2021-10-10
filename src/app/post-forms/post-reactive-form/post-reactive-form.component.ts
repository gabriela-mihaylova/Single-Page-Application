import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../post.service';
import {Announce} from '../../post.interface';
import {AuthServiceOrganization} from '../../auth/auth.service.organization';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-reactive-form',
  templateUrl: './post-reactive-form.component.html',
  styleUrls: ['./post-reactive-form.component.scss']
})
export class PostReactiveFormComponent implements OnInit {
 // @Output() announceSubmitted = new EventEmitter<Announce>();

  announce: Announce;
  hasLoggedOrganization: boolean;
  destroy$ = new Subject<boolean>();

  formGroup: FormGroup;
  constructor( private fb: FormBuilder,
               private authService: AuthServiceOrganization,
               private postService: PostService,
               private activatedRoute: ActivatedRoute,
               private router: Router) {
    this.announce = {
      title: '',
      description: '',
      type: '',
      category: '',
      isActive: ''

    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id){
        this.getAnnounce(id);
      }

    });


    this.buildForm();
    this.authService.getHasLoggedIn().pipe(takeUntil(this.destroy$)).
    subscribe(hasLogged => this.hasLoggedOrganization = hasLogged);
  }

  onSubmit(): void{
    // console.log(this.formGroup);
    const announce: Announce = {
      ...this.formGroup.value
    };
    if (!announce.id){
      this.postService.createAnnounce({...announce}).pipe(
        take(1)).
      subscribe(() => {
        this.router.navigate(['/announcements']);
      }, (error) => {
        console.log(error);
      });
      return;
    }
    this.postService.updateAnnounce(announce).pipe(
      takeUntil(this.destroy$)).
    subscribe(() => {
      this.router.navigate(['/announcements']);
    }, (error) => {
      console.log(error);
    });


  }

  buildForm(): void{
    this.formGroup = this.fb.group({
      id: this.announce.id,
      title: [this.announce.title, [Validators.required]],
      description: [this.announce.description, [Validators.required]],
      type: [this.announce.type, [Validators.required]],
      category: [this.announce.category, [Validators.required]],
      isActive: [this.announce.isActive,[Validators.required]]
    });
  }


  private getAnnounce(id: number): void {
    this.postService.getAnnounce(id).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.announce = response;
      this.buildForm();
    });
  }

}
