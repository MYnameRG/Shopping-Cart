import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  form: any = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    image: new FormControl('', [
      Validators.required
    ]),
    imageURL: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ])
  });

  onFileChange(e: any) {
    if(e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      this.product.uploadImage(formData)
      .subscribe({
        next: (data: any) => {
          this.form.patchValue({
            imageURL: data.path
          });
        },
        error: (err: any) => {
          alert(err.error.message);
          console.log(err.message);
        }
      });
    }
  }

  get title() {
    return this.form.get('title');
  }

  get price() {
    return this.form.get('price');
  }

  get image() {
    return this.form.get('image');
  }

  get description() {
    return this.form.get('description');
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const formValue = this.form.value;
    if(formValue.title === '' || formValue.price === '' || formValue.image === '' || formValue.description === '') {
      return alert('Please fill the form');
    }
    this.product.createProduct(formValue)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        alert(data.message);
        this.router.navigate(['/manage-products']);
      },
      error: (err: any) => {
        alert(err.error.message);
        console.log(err.message);
      }
    })
  }
}
