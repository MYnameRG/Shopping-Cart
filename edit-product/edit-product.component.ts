import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  private id: any;

  constructor(private product: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id;
      this.product.getProduct(id)
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.form.patchValue({
            title: data.data.title,
            price: data.data.price,
            imageURL: data.data.image,
            description: data.data.description
          })
        },
        error: (err: any) => {
          alert(err.error.message);
          console.log(err.message);
        }
      })
    })
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
    this.product.updateProduct(this.id, this.form.value)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['/manage-products']);
      },
      error: (err: any) => {
        alert(err.error.message);
        console.log(err.message);
      }
    })
  }
}
