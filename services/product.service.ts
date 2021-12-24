import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = 'http://localhost:3000'

  // private httpHeaderObject() {
  //   let headers_object = new HttpHeaders();
  //   headers_object.set("Authorization", this.authToken.getToken());
  //   return headers_object;
  // }

  private httpOptions = {
    headers: new HttpHeaders().set("Authorization", this.authToken.getToken())
  }

  constructor(private http: HttpClient, private authToken: AuthTokenService) { }

  getProducts() {
    return this.http.get(`${this.url}/products`, {
      headers: new HttpHeaders().set('Authorization', this.authToken.getToken())
    });
  }

  getProduct(id: any) {
    return this.http.get(`${this.url}/products/${id}`, this.httpOptions);
  }

  uploadImage(image: any) {
    return this.http.post(`${this.url}/products/images`, image, this.httpOptions);
  }

  createProduct(product: any) {
    return this.http.post(`${this.url}/products`, product, this.httpOptions);
  }

  updateProduct(id: any, product: any) {
    return this.http.put(`${this.url}/products/${id}`, product, this.httpOptions);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.url}/products/${id}`, this.httpOptions);
  }

  getCart(id: any) {
    return this.http.get(`${this.url}/products/cart/${id}`, this.httpOptions);
  }

  postCartItems(id: any, product_id: any) {
    return this.http.post(`${this.url}/products/cart/${id}/${product_id}`, this.httpOptions);
  }

  updateQuantity(id: any, product_id: any, qty: any) {
    return this.http.post(`${this.url}/products/cart/${id}/${product_id}/${qty}`, this.httpOptions);
  }

  deleteCartItems(id: any, product_id: any) {
    return this.http.delete(`${this.url}/products/cart/${id}/${product_id}`, this.httpOptions);
  }

  postOrders(id: any) {
    return this.http.post(`${this.url}/orders/${id}`, this.httpOptions);
  }

  getOrders() {
    return this.http.get(`${this.url}/orders`, this.httpOptions);
  }

  getUserOrders(id: any) {
    return this.http.get(`${this.url}/orders/${id}`, this.httpOptions);
  }

  // id --> order id
  cancelOrders(id: any) {
    return this.http.delete(`${this.url}/orders/${id}`, this.httpOptions);
  }
}
