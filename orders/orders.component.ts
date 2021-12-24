import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from '../services/auth-token.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private product: ProductService, private authToken: AuthTokenService) { }

  ngOnInit(): void {
    if(this.currentRole === 'admin') this.getOrders();
    else this.getUserOrders(this.authToken.currentUser._id);
  }

  get currentRole() {
    return this.authToken.currentUser.role;
  }

  getOrders() {
    this.product.getOrders()
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.orders = data.orders;
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    });
  }

  getUserOrders(id: any) {
    this.product.getUserOrders(id)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.orders = data.orders;
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    });
  }

  onCancel(order: any) {
    this.product.cancelOrders(order.id)
    .subscribe({
      next: (data: any) => {
        alert(data.message);
        this.getOrders();
      },
      error: (err) => {
        alert(err.error.message);
        console.log(err.message);
      }
    });
  }

}
