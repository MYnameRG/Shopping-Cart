import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  postLogin(user: any) {
    return this.http.post(`${this.url}/login`, user);
  }

  postSignup(user: any) {
    return this.http.post(`${this.url}/signup`, user);
  }

  getUser(id: any) {
    return this.http.get(`${this.url}/${id}`);
  }
}
