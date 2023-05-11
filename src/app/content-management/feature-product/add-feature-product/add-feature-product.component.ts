import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
import { FEATURE } from 'src/app/_models/cms';
@Component({
  selector: 'app-add-feature-product',
  templateUrl: './add-feature-product.component.html',
  styleUrls: ['./add-feature-product.component.scss']
})
export class AddFeatureProductComponent implements OnInit {
  featureForm: FormGroup;
  sidebarSpacing: any;
  fgsType: any;
  title: string = " "
  imageChangedEvent: any = '';
  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Feature/";
  id: any;
  // payload: FEATURE;
  isChecked = false;
  payload:any
  image: File;
  testApi:any;
  featureImage: any=null;
  Image:any;
  editMode: boolean = false
  reg= '([A-Za-z0-9]+)';
  croppedImage: any = '';
  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private CmsService: CmsService
    ) {
    this.featureForm = this.fb.group({
      // id:[''],
      image: [''],
      productName: ['', [Validators.required, Validators.pattern(this.reg)]],
      productModel: ['', [Validators.required]],
      productPrice: ['', [Validators.required,Validators.pattern("(\.[0-9]{0,9})?")]],
      productQuantity: ['', [Validators.required,Validators.pattern("(\[0-9]{0,9})?")]],
      isSpecialProduct:[''],
      // imageProduct:['']
    })
    console.log(this.featureForm)
  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Feature product"
        this.getFeatureById()
      } else {
        this.editMode = false
        this.title = "Add New Product Name"
      }
    });
  }

  submitForm(){
    this.payload = {
      productName: this.featureForm.controls['productName'].value,
      imageProduct: this.featureImage,
      productPrice: this.featureForm.controls['productPrice'].value,
      productQuantity: this.featureForm.controls['productQuantity'].value,
      productModel: this.featureForm.controls['productModel'].value,
    }




  this.ngxLoader.start();
  if (this.editMode) {
  this.editProduct()
  } else {
    // this.addproduct()
    this.addproduct(this.payload)
  }
  this.route.navigate[('/cms/feature')]
  }



  addproduct(recievedValue) {
    let newPayload= Object.assign({},recievedValue)
    this.CmsService.addFeatureProduct(this.featureForm.value).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("Feature Product added successfully", "Product Added")
         this.ngxLoader.stop()
         this.route.navigate(['/cms/feature'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop()
       }
     })
   }

   editProduct(){
    console.log(this.payload)
    this.CmsService.editFeature(this.payload, this.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Feature product edit successfully", "Feature edit")
        this.ngxLoader.stop()
        this.route.navigate(['/cms/feature'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
   }
   fileChangeEvent(event) {
    this.featureImage = event.target.files[0];
    console.log("festure image" + this.featureImage)
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (data) => {
      this.Image = data.target.result;
      // console.log("image value===>" + this.Image)
    }
  }


   getFeatureById() {
    this.CmsService.getFeatureById(this.id).subscribe((res) => {
      this.testApi=res
      console.log("featur edit apis"+ JSON.stringify(this.testApi))
      this.featureForm.patchValue({
        productName: res.productName,
       image: res.image,
       productModel: res.productModel,
        productPrice: res.productPrice,
        productQuantity: res.productQuantity,
        isSpecialProduct: res.isSpecialProduct
      })
      this.Image = this.imgbucket.concat(res.image)

      this.ngxLoader.stop();
    })
  }


imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
imageLoaded() {
    / show cropper /
}
cropperReady() {
    / cropper ready /
}
loadImageFailed() {
    / show message /
}


onToggleSidebar(sidebarState: any) {
  if (sidebarState === 'open') {
    this.sidebarSpacing = 'contracted';
  } else {
    this.sidebarSpacing = 'expanded';
  }
}
}
