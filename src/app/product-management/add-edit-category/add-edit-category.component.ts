import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { CommonService } from 'src/app/_services/common';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent implements OnInit {
  imageChangedEvent: any = '';
  Image: any;
  selectedItem: any;
  sidebarSpacing: any;
  fgsType: any;
  id: string;
  productCategoryForm: FormGroup;
  payload: any;
  subCategory: String[];
  status: string[];

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private route: Router,
    private toastr: ToastrMsgService,
    private commonService: CommonService,
    private ProductService: ProductService
  ) {
    this.productCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      image: ['', [Validators.required]],
      categoryOrder: [''],
      status: [''],
    });
    this.subCategory = ['casual', 'formal', 'Gym Wear', 'Sports Wear'];
    this.status = ['Active', 'Inactive'];
  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
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

  submit() {
    if (this.productCategoryForm.valid) {
      this.payload = {
        username: localStorage.getItem('email'),
        categoryName: this.productCategoryForm.controls['categoryName'].value,
        subCategory: this.productCategoryForm.controls['subCategory'].value,
        image: this.Image,
        categoryOrder: this.productCategoryForm.controls['categoryOrder'].value,
        status: this.productCategoryForm.controls['status'].value,
      };
    }
    this.ngxLoader.start();
    this.submitDetails(this.payload);
    console.log(
      'submit form value payload 24 ===>' + JSON.stringify(this.payload)
    );
  }

  submitDetails(recievedValue: any) {
    let newPayload = Object.assign({}, recievedValue);
    this.ProductService.addCategory(newPayload).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'Category added successfully',
          'Category Added'
        );
        this.ngxLoader.stop();
        this.route.navigate(['/documents/document-list']);
      } else {
        console.log('error');
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
      }
    });
  }

  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    this.Image = event.target.files[0];
    console.log('this.image' + this.Image);
  }
}
