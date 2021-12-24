import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthTokenService } from '../services/auth-token.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() name: any;

  constructor(public authToken: AuthTokenService, private router: Router, private auth: AuthService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    // this.auth.getUser(this.authToken.currentUser._id)
    // .subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //   },
    //   error: (err) => {
    //     alert('Unexpected Errors');
    //     console.log(err.message);
    //   }
    // });
  }

  onLogout(): void {
    this.authToken.removeToken();
    this.router.navigate(['/login']);
  }

  get user_name() {
    return this.authToken.getName();
  }
}
