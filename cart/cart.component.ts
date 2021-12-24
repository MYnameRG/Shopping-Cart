import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from '../services/auth-token.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any[] = [];
  totalPrice: any;

  constructor(private product: ProductService, private authToken: AuthTokenService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  onSelectChange(e: any, product: any) {
    const qty = e.target.value;
    this.product.updateQuantity(this.authToken.currentUser._id, product._id, qty)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.totalPrice = data.totalPrice;
        this.getCartItems();
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    });
  }

  onDeleteItem(id: any) {
    this.product.deleteCartItems(this.authToken.currentUser._id, id)
    .subscribe({
      next: (data: any) => {
        this.getCartItems();
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    })
  }

  getCartItems() {
    this.product.getCart(this.authToken.currentUser._id)
    .subscribe({
      next: (data: any) => {
        this.products = data.cart;
        this.getTotalPrice(this.products);
      },
      error: (err: any) => {
        alert(err.error.message);
        console.log(err.message);
      }
    })
  }

  postCheckOut() {
    this.product.postOrders(this.authToken.currentUser._id)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.getCartItems();
        alert('Order Placed!');
      },
      error: (err: any) => {
        alert(err.error.message);
        console.log(err.message);
      }
    })
  }

  getTotalPrice(products: any[]) {
    this.totalPrice = 0;
    for(let product of products) {
      this.totalPrice += product.product_id.price * product.quantity;
    }
  }
}
