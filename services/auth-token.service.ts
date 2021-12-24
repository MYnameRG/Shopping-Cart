import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  setName(name: string) {
    localStorage.setItem('name', name);
  }

  getName() {
    return localStorage.getItem('name');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  verifyToken(token: string) {
    const jwtHelper = new JwtHelperService();
    if(!token) return false;

    let isExpired = jwtHelper.isTokenExpired(token);
    if(isExpired) return false;

    return true;
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if(!token) return null;

    return new JwtHelperService().decodeToken(token);
  }
}
