import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTokenService } from '../services/auth-token.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @Output() name = new EventEmitter();

  constructor(private auth: AuthService, private authToken: AuthTokenService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {
  }

  form: any = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submit(e: Event) {
    e.preventDefault();
    const formValue = this.form.value;
    if(formValue.email === '' || formValue.password === '') {
      return alert('Please fill the form');
    }
    this.auth.postLogin(formValue)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        alert(data.message);
        this.authToken.setToken(data.data.user.token);
        this.authToken.setName(data.data.user.name);
        if(data.data.user.role === 'admin') {
          this.appComponent.getName(data.data.user.name);
          this.router.navigate(['/manage-products']);
        }
        else {
          this.appComponent.getName(data.data.user.name)
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.error.message);
      }
    });
  }
}
