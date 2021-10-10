import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../auth/user_model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {Organization} from '../../auth/organization_model';
import {AutService} from '../../auth/aut.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {AuthServiceOrganization} from '../../auth/auth.service.organization';

@Component({
  selector: 'app-post-reactive-organization-profile',
  templateUrl: './post-reactive-organization-profile.component.html',
  styleUrls: ['./post-reactive-organization-profile.component.scss']
})
export class PostReactiveOrganizationProfileComponent implements OnInit, OnDestroy {
  organizations: Organization;
  formGroup: FormGroup;
  destroy$ = new Subject<boolean>();
  constructor(private authServiceOrganization: AuthServiceOrganization,
              private router: Router,
              private  fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    this.organizations = {
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
        this.getOrganization(id);
      }
    });

    this.buildForm();
  }
  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void{
    const organization: Organization = {
      ...this.formGroup.value
    };
    this.authServiceOrganization.editOrganization(organization).pipe(takeUntil(this.destroy$)).
    subscribe(() => {
      this.router.navigate(['/organization-profile']);
    }, (error) => {
      console.log(error);
    });

  }
  buildForm(): void{
    this.formGroup = this.fb.group({
      id: this.organizations.id,
      name: [this.organizations.name],
      username: [this.organizations.username],
      password: [this.organizations.password],
      email: [this.organizations.email]
    });
  }
  private getOrganization(id: number): void {
    this.authServiceOrganization.getOrganization(id).pipe(takeUntil(this.destroy$)).
    subscribe((response) => {
      this.organizations = response;
      this.buildForm();
    });
  }
}
