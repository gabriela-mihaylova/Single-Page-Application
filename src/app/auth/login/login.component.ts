import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutService} from '../aut.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../user_model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formGroup: FormGroup;
    errorMessage: string;
    constructor( private fb: FormBuilder,
                 private router: Router,
                 private authService: AutService) { }

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
        this.authService.setLoggedUser(response);
        this.router.navigate(['user-profile']);
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

