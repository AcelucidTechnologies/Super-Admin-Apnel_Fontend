import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-product-option',
  templateUrl: './add-product-option.component.html',
  styleUrls: ['./add-product-option.component.scss'],
})
export class AddProductOptionComponent {
  selectForm: FormGroup;
  productOptionlist: any;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private ProductService: ProductService,
    private route: Router
  ) {
    this.selectForm = this.fb.group({
      username: localStorage.getItem('email'),
      productName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}



  submit() {
    this.ngxLoader.start();
    this.ProductService.createproductOption(this.selectForm.value).subscribe(
      (res) => {
        this.productOptionlist = res;
        console.log('100' + this.productOptionlist);
        if (res) {
          this.ngxLoader.start();
          location.reload();
          this.toastr.showSuccess(
            'Product option added successfully',
            'Product option Added'
          );
        }
        (error: any) => {
          console.log('error');
          this.toastr.showError('Somthing wrong Please check', 'Error occured');
          this.ngxLoader.stop();
        };
        this.route.navigate(['/product/productOptionList']);
      }
    );
  }
}
