import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthServiceOrganization} from '../auth.service.organization';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.scss']
})
export class RegisterOrganizationComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthServiceOrganization
              ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void{
    const formValue = this.formGroup.value;

    if (formValue.password !== formValue.repeatPassword){
      this.errorMessage = 'Password do not match';

      this.formGroup.reset({
        name: formValue.name,
        username: formValue.username,
        password: '',
        repeatPassword: '',
        email : formValue.email
      });
      return;
    }
    this.authService.getOrganizations().pipe(
      map((stream) => stream.find(organization => organization.username === formValue.username)),
      take(1)).subscribe(response => {
        if (response){
          this.errorMessage = 'Username is already been taken';
          return;
        }
        this.authService.register(formValue).pipe(take(1)).subscribe(() => {
          this.router.navigate(['loginOrganization']);
        });
    });

  }

  private buildForm(): void{
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]]

    });
  }

}
