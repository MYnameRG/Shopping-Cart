import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-manage-list',
  templateUrl: './product-manage-list.component.html',
  styleUrls: ['./product-manage-list.component.css']
})
export class ProductManageListComponent implements OnInit {
  products: any[] = [];

  constructor(private router: Router, private product: ProductService) { }

  deleteProduct(product: any) {
    this.product.deleteProduct(product._id)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.getProducts();
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    this.product.getProducts()
    .subscribe({
      next: (data: any) => {
        this.products = data.data;
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    })
  }
}
