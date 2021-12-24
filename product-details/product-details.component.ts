import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthTokenService } from '../services/auth-token.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  details: any;

  constructor(private route: ActivatedRoute, private router: Router, private product: ProductService, private authToken: AuthTokenService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      let id = params.params['id'];
      this.product.getProduct(id)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.details = data.data;
        },
        error: (err: any) => {
          alert(err.error.message);
          console.log(err);
        }
      })
    });
  }

  get currentRole() {
    return this.authToken.currentUser.role;
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

  back() {
    if(this.currentRole == 'user') this.router.navigate(['/products']);
    else this.router.navigate(['/manage-products']);
  }
}
