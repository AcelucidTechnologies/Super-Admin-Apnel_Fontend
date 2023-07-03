import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
// import { category, parent_category, SEO } from 'src/app/_models/catalog';
import { CommonService } from 'src/app/_services/common';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  selectedItem: any;
  imageChangedEvent: any = '';
  Image: any;
  sidebarSpacing: any;
  payload: any;
  fgsType: any;
  id: any;
  title: string = ' ';
  editMode: boolean = false;
  productCategoryForm: FormGroup;
  categorylist: any;
  image: File;
  imageUrl;

  subCategory: string[];
  status: string[];
  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private route: Router,
    private toastr: ToastrMsgService,
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductService
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.productCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      image: [''],
      categoryOrder: [''],

      status: [''],
    });
    this.subCategory = ['casual', 'formal', 'Gym Wear', 'Sports Wear'];
    this.status = ['Active', 'Inactive'];
  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
    this.getProductCategoryById();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }
  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    this.Image = event.target.files[0];
    console.log('this.image' + this.Image);
  }

  getProductCategoryById() {
    this.ProductService.getCategoryById(this.id).subscribe((res: any) => {
      this.productCategoryForm.patchValue({
        categoryName: res.categoryName,
        subCategory: res.subCategory,
        status: res.status,
        categoryOrder: res.categoryOrder,
      });

      this.ngxLoader.stop();
    });
  }

  editProductCategory(editData: any) {
    this.ProductService.editCategory(editData, this.id).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('Product edit successfully', 'Product edit');
        this.ngxLoader.stop();
        this.route.navigate(['/product/categorylist']);
      }
      (error: any) => {
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
        this.ngxLoader.stop();
        this.route.navigate(['/']);
      };
    });
  }

  submit() {
    this.ngxLoader.start();
    if (this.productCategoryForm.valid) {
      this.payload = {
        username: localStorage.getItem('email'),
        image: this.Image,
        subCategory: this.productCategoryForm.controls['subCategory'].value,
        categoryName: this.productCategoryForm.controls['categoryName'].value,
        status: this.productCategoryForm.controls['status'].value,
        categoryOrder: this.productCategoryForm.controls['categoryOrder'].value,
      };
    }
    this.ProductService.editCategory(this.payload, this.id).subscribe((res) => {
      this.categorylist = res;
      if (res) {
        this.ngxLoader.start();
        this.toastr.showSuccess(
          'Category details edited successfully',
          'Category edited'
        );
      }
      this.route.navigate(['/product/categorylist']);
      (error: any) => {
        console.log('error');
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
        this.ngxLoader.stop();
      };
    });
  }
}
