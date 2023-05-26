import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { product, product_region, product_details, manufacturer, Description, prices, SEO, Satatus, Country_List, catalogExtraDetailsStructure } from 'src/app/_models/catalog'
import { CommonService } from 'src/app/_services/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductSubmitComponent } from '../dialog-product-submit/dialog-product-submit.component';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  // Category = [{ value: 'active', label: 'Active', inactive: false },
  // { value: 'inactive', label: 'Inactive', inactive: false }];
  sidebarSpacing: string = "";
  fgsType: any;
  id: any
  urls = [];
  title: string = " "
  editMode: boolean = false
  categoryDetails: catalogExtraDetailsStructure[] = [];
  productForm: FormGroup
  payload
  product_region: product_region
  product_details: product_details
  countryList:Country_List[]=[];
  manufacturer: manufacturer
  prices: prices
  SEO: SEO
  catergoryName:String[];
  weightType:String[];
  status:String[];

  Image
  imageData: File
  Status = Satatus
  expand: boolean = false
  Description: Description
  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
    private route: Router,
    private CommonService: CommonService,
    private toastr: ToastrMsgService,
    private ProductService: ProductService,
    public dialog: MatDialog,
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      categoryName: ['', Validators.required],
      country: ['', [Validators.required]],
      language: ['', [Validators.required]],
      model: ['', [Validators.required]],
      ourPrice: ['', [Validators.required]],
      marketPrice: ['', [Validators.required]],
      productWeight: ['', [Validators.required]],
      weightType: ['', [Validators.required]],
      productImage: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      status: ['', [Validators.required]],

    })

  this.catergoryName = ['casual', 'formal', 'Sports Wear', 'Gym Wear' ]
  this.weightType = ['weight A', 'weight B', 'weight C', 'weight D' ]
  this.status = ['active', 'Inactive']


  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.getCountriesList()
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Product"
        this.getProductById()
      } else {
        this.editMode = false
        this.expand = true
        this.title = "Add New Product"

      }
    });

    this.productForm.patchValue({
      country: this.categoryDetails[0].country,
      language: this.categoryDetails[0].language,
      model: this.categoryDetails[0].model,
      ourPrice: this.categoryDetails[0].ourPrice,
      marketPrice: this.categoryDetails[0].marketPrice,
      productWeight: this.categoryDetails[0].productWeight,
      productType: this.categoryDetails[0].productType,
      productImage: this.categoryDetails[0].productImage,
      productDescription: this.categoryDetails[0].productDescription,
      status: this.categoryDetails[0].status
    });
}

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }
  addProduct(addpayload: product) {
    this.ProductService.addProduct(addpayload).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Product added successfully", "Product Added")
        this.ngxLoader.stop()
        this.route.navigate(['/product/productlist'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
  }
  getProductById() {
    this.ProductService.getProductById(this.id).subscribe((res: product) => {
      this.productForm.patchValue({
        country: res.Product_Region.country,
        language: res.Product_Region.language,
        model: res.product_Detail.name,
        SKU: res.product_Detail.SKU,
        Status: res.product_Detail.Status,
        category: res.product_Detail.category,
        is_featured: res.product_Detail.is_featured,
        visible_individually: res.product_Detail.visible_individually,
        Quantity: res.product_Detail.Quantity,
        country_origin: res.manufacturer.country_origin,
        brand: res.manufacturer.brand,
        short_description: res.description.short_description,
        description: res.description.description,
        price: res.price.price,
        cost: res.price.cost,
        special_price: res.price.special_price,
        special_price_from: this.CommonService.convertDate(res.price.special_price_from),
        special_price_to: this.CommonService.convertDate(res.price.special_price_to),
        videos: res.videos,
        meta_title: res.seo.meta_title,
        meta_description: res.seo.meta_description,
        meta_keywords: res.seo.meta_keywords,
      })
      this.Image = res.images

      this.ngxLoader.stop();
    })
  }
  editProduct(editData: product) {
    if (this.imageData && this.imageData != undefined) {
      this.payload['image'] = this.imageData
    }
    this.ProductService.editProduct(editData, this.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Product edit successfully", "Product edit")
        this.ngxLoader.stop()
        this.route.navigate(['/product/productlist'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
  }

  submitForm() {
    let payload = {
      country: this.productForm.controls['country'].value,
      language: this.productForm.controls['language'].value,
      model: this.productForm.controls['model'].value,
      ourPrice: this.productForm.controls['ourPrice'].value,
      marketPrice: this.productForm.controls['marketPrice'].value,
      productWeight: this.productForm.controls['productWeight'].value,
      productType: this.productForm.controls['productType'].value,
      productImage: this.productForm.controls['productImage'].value,
      productDescription: this.productForm.controls['productDescription'].value,
      status: this.productForm.controls['status'].value,

    }

    // this.SEO = {
    //   meta_title: this.productForm.controls['meta_description'].value,
    //   meta_description: this.productForm.controls['meta_title'].value,
    //   meta_keywords: this.productForm.controls['meta_keywords'].value
    // }
    // this.prices = {
    //   price: this.productForm.controls['price'].value,
    //   cost: this.productForm.controls['cost'].value,
    //   special_price: this.productForm.controls['special_price'].value,
    //   special_price_to: this.productForm.controls['special_price_to'].value,
    //   special_price_from: this.productForm.controls['special_price_from'].value
    // }
    // this.Description = {
    //   description: this.productForm.controls['description'].value,
    //   short_description: this.productForm.controls['short_description'].value
    // }
    // this.product_region = {
    //   country: this.productForm.controls['country'].value,
    //   language: this.productForm.controls['language'].value,
    // }

    // this.manufacturer = {
    //   brand: this.productForm.controls['brand'].value,
    //   country_origin: this.productForm.controls['country_origin'].value
    // }
    // this.product_details = {
    //   name: this.productForm.controls['name'].value,
    //   SKU: this.productForm.controls['SKU'].value,
    //   category: this.productForm.controls['category'].value,
    //   Quantity: this.productForm.controls['Quantity'].value,
    //   is_featured: this.productForm.controls['is_featured'].value,
    //   Status: this.productForm.controls['Status'].value,
    //   is_new: true,
    //   price: this.productForm.controls['price'].value,
    //   visible_individually: this.productForm.controls['visible_individually'].value
    // }
    // this.payload = {
    //   Product_Region: this.product_region,
    //   product_Detail: this.product_details,
    //   manufacturer: this.manufacturer,
    //   description: this.Description,
    //   price: this.prices,
    //   seo: this.SEO,
    //   image: ""
    // }
    this.ngxLoader.start();
    if (this.editMode) {
      this.editProduct(this.payload)
    } else {
      this.addProduct(this.payload)
    }

  }
  OnChangesEvent(event) {
    this.imageData = event.target.files[0];
    console.log(event.target.files)
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (data) => {
      this.Image = data.target.result;
      console.log(data.target.result)
    }
  }
  getCountriesList() {
    this.CommonService.getCountries().subscribe((res:any) => {
      this.countryList = res
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogProductSubmitComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.submitForm()
      }
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result);
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

}
