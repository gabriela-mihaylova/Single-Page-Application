import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../auth/user_model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostService} from '../../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AutService} from '../../auth/aut.service';
import {take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-post-reactive-profile',
  templateUrl: './post-reactive-profile.component.html',
  styleUrls: ['./post-reactive-profile.component.scss']
})
export class PostReactiveProfileComponent implements OnInit, OnDestroy {
  users: User;
  formGroup: FormGroup;
  destroy$ = new Subject<boolean>();
 // @Output() postSubmitted = new EventEmitter<User>();

  constructor(private authService: AutService,
              private router: Router,
              private  fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    this.users = {
      name: '',
      username: '',
      password: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if (id) {
        this.getUser(id);
      }
    });

    this.buildForm();
  }
  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void{
    const user: User = {
      ...this.formGroup.value
    };
    this.authService.editUser(user).pipe(takeUntil(this.destroy$)).
    subscribe(() => {
      this.router.navigate(['/user-profile']);
    }, (error) => {
      console.log(error);
    });

  }
  buildForm(): void{
    this.formGroup = this.fb.group({
      id: this.users.id,
      name: [this.users.name],
      username: [this.users.username],
      password: [this.users.password],
      email: [this.users.email]
    });
  }
  private getUser(id: number): void {
    this.authService.getUser(id).pipe(takeUntil(this.destroy$)).
    subscribe((response) => {
      this.users = response;
      this.buildForm();
    });
  }
}
