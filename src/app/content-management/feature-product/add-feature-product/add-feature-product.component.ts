import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent ,base64ToFile} from 'ngx-image-cropper';
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
  ImagePath:string;
  fgsType: any;
  featureList : any[]=[]
  title: string = " "
  check: boolean;
  imageChangedEvent: any = '';
  Image: any =
    'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADp0lEQVR4nO2bSWhUQRCGvyhuiaKCREER94MeAipiEPHmJWrUix4URFFxS4xxuQQdF9zXk4wSQURvbrgvuIEXT17F6MntIEb04JK4FdQLZfscM+Msb3reD8U8eqr7vfq7q7uq+z2IESNGjBgxLCqAWmAdsMkTaQBmAeWkQBmwAXgP/PBUWoFGtfU3dAHOROAB8yWnXRI2OAotQBLY7Ykk1SZro7h4h8/bYX8c6IF/EJuaHXcoRyeHoPCpp8YHENueGXtnSOF6U3AU/5F03SBhCuTad/xhbyImgIxHwEBgvg6ldXpdSQmMgCrgCvAtZI2Vssuq4yUBy4CvnQg22oB6PCNghWPkF+AasF/lupZZneV4QkCV0/N3gWEhesOBew5J4/CAgEtGTwzsnkJX/rtv9M9S5AQMANpNj0ov/wsjzYiR+aAfRUzAXKNzNY2bXTf1JOQuWgLqjc7ONG62x9RbRRETUGd0dmVIwBo8cYFradzshqk3B48mwRGduNEoMwm2axtFvQxeSXMZfGD0pS7FTsB4Xc4C3fvayy5GOca3aV0vQuEGJ8yVIX4TOAAcBG6F5AlSx6tkaKOZD1JJu2625hp909zGy0o6XO2Euq7IHDGZ7EBcah7QBJwCHure5du/pOOfgRfAYx2RJ7XuPHXFfdkgIICExEu0nsjivyRI6UBC5kV6TvGyEyPtfyQRlS2xLhprXNAeTNeQD8CnDOptKTQB4rtLgScpHvKN5h87gAXANGA00CekPTnt6Q8MBiZo/rFaD0cuAs+B79qu/E4vJAG1zh69XTbv6BnemBzctzcwCRgbFOSbgKHao67hr4Ct2nt5RSKPBNTo7G0Nf61bbd0oEBJ5IEB8c5vxv2Co79AhWVAkckyAGH/E6XXx/SlEBIkcEtBVz+Kt8ef1RJpSIOCQY/wRJYVSIGClY7ysxVGAjL7DKhW5IqDaSZ2bw97LKRDq3G26RJYJ6K3JStDm7YgN+5wfjyedMHYQ0UJOCZgYFmuXEgEPTFuy/FFKBMw27XwsRExfaAIemXY2E13khICpzuaE5OQlRcA508Zeoo0/7G00BbKEpYtKs0ssv0MosvcEZ5qClgzeFLUhr5wRRBk9dVsseN4a9H3ZVids7ZHh0reQaBt/wjzrO6BX8GdjSL6e7MSHCE3O3vz2CHwcESbHnJ4XWWvZKQvJ232WU2HJWZlOCtYdfJN32vMpM9NynRgbIvChQ7akQV+N7/D5GDFixIjxi4GfxUF9ZJ3ajNUAAAAASUVORK5CYII';

  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Feature/";
  id: any;
  imageData: any=null;
  // payload: FEATURE;
  isSpecialProductChecked: boolean = false
  img: any;
  public imageName: string;
  blobImage:any
  payload:any
  image: File;
  testApi:any;
  featureImage: any=null;
  // Image:any;
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
      image: ['',Validators.compose([Validators.required])],
      productName: ['', [Validators.required]],
      productModel: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      productQuantity: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      // productQuantity: ['', [Validators.required,Validators.pattern("(\[0-9]{0,9})?")]],
      isSpecialProduct:[false],
    })

    console.log(this.featureForm)
  }



  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    //this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Feature product"
        this.getFeatureById()
      } else {
        this.editMode = false;
        this.check=true;
        this.title = "Add New Product Name"
      }
    });
  }

  submitForm(){
    this.ngxLoader.start();
    this.payload = {
      username: localStorage.getItem('email'),
      productName: this.featureForm.controls['productName'].value,
      image:this.blobImage,
      productPrice: this.featureForm.controls['productPrice'].value,
      productQuantity: this.featureForm.controls['productQuantity'].value,
      productModel: this.featureForm.controls['productModel'].value,
      isSpecialProduct: this.featureForm.controls['isSpecialProduct'].value || false,
    }
    if(this.payload.image  == null){
      this.payload.image = this.ImagePath
    }



  this.ngxLoader.start();
  if (this.editMode) {
  this.editProduct()
  } else {
   // this.addproduct()
  }
  this.submitDetails(this.payload)

  //this.route.navigate(['/cms/feature']);
 // this.getFeatureList()

  }


  submitDetails(recievedValue:any){
    let newPayload= Object.assign({},recievedValue)
    this.CmsService.addFeatureProduct(newPayload)
    .subscribe((res) => {
      if (res) {
      //  this.toastr.showSuccess("Feature Product added successfully", "Product Added")
        this.ngxLoader.stop()
        this.route.navigate(['/cms/feature'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
      }
      console.log(res)
    });
  }

  getFeatureList(){
    this.CmsService.getFeatureList().subscribe((res) => {
      this.featureList = res
      this.featureList = res.filter(item=>item.isSpecialProduct === false)
      this.ngxLoader.stop();
    })

  }
  addproduct() {
    this.CmsService.addFeatureProduct(this.featureForm.value).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("Feature Product added successfully", "Product Added")
         this.ngxLoader.stop();
         this.route.navigate(['/cms/feature'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop();
         this.route.navigate(['/'])
       }
     })
   }

   editProduct(){
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



   getFeatureById() {
    this.CmsService.getFeatureById(this.id).subscribe((res) => {
      this.testApi=res
      const test =this.featureForm.patchValue({
        productName: res.productName,
       image: res.image,
       productModel: res.productModel,
        productPrice: res.productPrice,
        productQuantity: res.productQuantity,
        isSpecialProduct: res.isSpecialProduct
      })
      this.Image = this.imgbucket.concat(res.image)
      // this.ImagePath = res.image
      this.ImagePath = this.imgbucket.concat(res.image)

      this.ngxLoader.stop();
    })
  }


  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    this.imageData = event.target.files[0];
        var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.imageName = event.target.files[0].name;
    reader.onload = (data) => {
      this.Image = data.target.result;

    };
  }


  blobToFile(theBlob:any, fileName:any){
    console.log("blob to file",new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type }))
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.img = base64ToFile(this.croppedImage);
      this.blobImage=this.blobToFile(this.img,this.imageName)
  }
  imageLoaded() {}
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
