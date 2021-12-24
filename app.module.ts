import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductManageListComponent } from './product-manage-list/product-manage-list.component';
import { AuthTokenService } from './services/auth-token.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductService } from './services/product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    ProductListComponent,
    ProductManagementComponent,
    ProductManageListComponent,
    EditProductComponent,
    CartComponent,
    OrdersComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'create-product', component: ProductManagementComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'manage-products', component: ProductManageListComponent },
      { path: 'edit-product/:id', component: EditProductComponent},
      { path: 'cart', component: CartComponent},
      { path: 'orders', component: OrdersComponent},
      { path: 'products/:id', component: ProductDetailsComponent}
    ])
  ],
  providers: [AuthService, AuthTokenService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
