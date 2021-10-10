import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutService} from '../aut.service';
import {map, take} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string;

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AutService) { }

  ngOnInit(): void {
    this.buildForm();
  }
  onSubmit(): void {

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

    this.authService.getUsers().pipe(
      map((stream) => stream.find(user => user.username === formValue.username)),
      take(1)).
    subscribe(response => {
      if (response){
        this.errorMessage = 'Username is already been taken';
        return;
      }
      this.authService.register(formValue).pipe(
        take(1)
      ).subscribe(() => {
        this.router.navigate(['login']);
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
