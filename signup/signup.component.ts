import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTokenService } from '../services/auth-token.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private authToken: AuthTokenService, private router: Router) { }

  ngOnInit(): void {
  }

  form: any = new FormGroup({
    name: new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required)
    }),
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

  get fname() {
    return this.form.get('name.fname');
  }

  get lname() {
    return this.form.get('name.lname');
  }

  formData() {
    return {
      name: `${this.form.value.name.fname} ${this.form.value.name.lname}`,
      email: this.form.value.email,
      password: this.form.value.password
    };
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const formValue = this.formData();
    if(formValue.email === '' || formValue.password === '' || this.form.value.name.fname === '' || this.form.value.name.lname === '') {
      return alert('Please fill the form');
    }
    this.auth.postSignup(formValue)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        alert(data.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    })
  }
}
