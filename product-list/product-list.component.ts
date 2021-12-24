import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from '../services/auth-token.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private product: ProductService, private authToken: AuthTokenService) { }

  ngOnInit(): void {
    this.product.getProducts()
    .subscribe({
      next: (data: any) => {
        this.products = data.data;
      },
      error: (err) => {
        alert(err.message);
        console.log(err.message);
      }
    })
  }

  addToCart(product_id: any) {
    this.product.postCartItems(this.authToken.currentUser._id, product_id)
    .subscribe({
      next: (data: any) => {
        alert(data.message);
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    });
  }
}
