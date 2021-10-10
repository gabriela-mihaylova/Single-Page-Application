import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutService} from '../aut.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {AuthServiceOrganization} from '../auth.service.organization';

@Component({
  selector: 'app-login-organization',
  templateUrl: './login-organization.component.html',
  styleUrls: ['./login-organization.component.scss']
})
export class LoginOrganizationComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string;
  constructor( private fb: FormBuilder,
               private authService: AuthServiceOrganization,
               private router: Router) { }

  ngOnInit(): void {

    this.buildForm();
  }

  onSubmit(): void{
    this.errorMessage  = null;
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;
    const email = this.formGroup.value.email;
    this.authService.login(username, password, email).pipe(take(1)).
    subscribe(response => {
      if (!response){
        this.errorMessage = 'Invalid username or password';
        return;
      }
      this.authService.setLoggedOrganization(response);
      this.router.navigate(['organization-profile']);
    });

  }
  private buildForm(): void{
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });


  }

}
