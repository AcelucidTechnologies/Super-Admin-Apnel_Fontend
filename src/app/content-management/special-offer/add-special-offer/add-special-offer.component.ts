import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service';

@Component({
  selector: 'app-add-special-offer',
  templateUrl: './add-special-offer.component.html',
  styleUrls: ['./add-special-offer.component.scss'],
})
export class AddSpecialOfferComponent implements OnInit {
  specialOfferForm: FormGroup;
  ImagePath: string;
  sidebarSpacing: any;
  fgsType: any;
  isChecked = true;
  title: string = ' ';
  imageChangedEvent: any = '';
  offerList: any[] = [];
  id: any;
  payload: any;
  image: File;
  check: boolean;
  editMode: boolean = false;
  reg = '([A-Za-z0-9]+)';
  Image: any =
    'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADp0lEQVR4nO2bSWhUQRCGvyhuiaKCREER94MeAipiEPHmJWrUix4URFFxS4xxuQQdF9zXk4wSQURvbrgvuIEXT17F6MntIEb04JK4FdQLZfscM+Msb3reD8U8eqr7vfq7q7uq+z2IESNGjBgxLCqAWmAdsMkTaQBmAeWkQBmwAXgP/PBUWoFGtfU3dAHOROAB8yWnXRI2OAotQBLY7Ykk1SZro7h4h8/bYX8c6IF/EJuaHXcoRyeHoPCpp8YHENueGXtnSOF6U3AU/5F03SBhCuTad/xhbyImgIxHwEBgvg6ldXpdSQmMgCrgCvAtZI2Vssuq4yUBy4CvnQg22oB6PCNghWPkF+AasF/lupZZneV4QkCV0/N3gWEhesOBew5J4/CAgEtGTwzsnkJX/rtv9M9S5AQMANpNj0ov/wsjzYiR+aAfRUzAXKNzNY2bXTf1JOQuWgLqjc7ONG62x9RbRRETUGd0dmVIwBo8cYFradzshqk3B48mwRGduNEoMwm2axtFvQxeSXMZfGD0pS7FTsB4Xc4C3fvayy5GOca3aV0vQuEGJ8yVIX4TOAAcBG6F5AlSx6tkaKOZD1JJu2625hp909zGy0o6XO2Euq7IHDGZ7EBcah7QBJwCHure5du/pOOfgRfAYx2RJ7XuPHXFfdkgIICExEu0nsjivyRI6UBC5kV6TvGyEyPtfyQRlS2xLhprXNAeTNeQD8CnDOptKTQB4rtLgScpHvKN5h87gAXANGA00CekPTnt6Q8MBiZo/rFaD0cuAs+B79qu/E4vJAG1zh69XTbv6BnemBzctzcwCRgbFOSbgKHao67hr4Ct2nt5RSKPBNTo7G0Nf61bbd0oEBJ5IEB8c5vxv2Co79AhWVAkckyAGH/E6XXx/SlEBIkcEtBVz+Kt8ef1RJpSIOCQY/wRJYVSIGClY7ysxVGAjL7DKhW5IqDaSZ2bw97LKRDq3G26RJYJ6K3JStDm7YgN+5wfjyedMHYQ0UJOCZgYFmuXEgEPTFuy/FFKBMw27XwsRExfaAIemXY2E13khICpzuaE5OQlRcA508Zeoo0/7G00BbKEpYtKs0ssv0MosvcEZ5qClgzeFLUhr5wRRBk9dVsseN4a9H3ZVids7ZHh0reQaBt/wjzrO6BX8GdjSL6e7MSHCE3O3vz2CHwcESbHnJ4XWWvZKQvJ232WU2HJWZlOCtYdfJN32vMpM9NynRgbIvChQ7akQV+N7/D5GDFixIjxi4GfxUF9ZJ3ajNUAAAAASUVORK5CYII';

  imgbucket = 'https://adminpanelbucket.s3.amazonaws.com/Feature/';
  imageData: any = null;
  categoryDrop: any;
  ProductDrop: any;
  blobImage: any;
  img: any;
  public imageName: string;
  croppedImage: any = '';
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private CmsService: CmsService
  ) {
    this.specialOfferForm = this.fb.group({
      image: ['',Validators.compose([Validators.required])],
      productName: ['', [Validators.required]],
      productModel: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      productQuantity: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+$/)],
      ],
    });
    console.log(this.specialOfferForm);
  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true;
        this.title = 'Edit Special offer';
        this.getFeatureById();
      } else {
        this.editMode = false;
        this.check=true;
        this.title = 'Add New Special offer';
      }
    });
    this.categoryDrop = ['Shoes', 'Mobile', 'TV', 'Earphone'];
    this.ProductDrop = ['Campus', 'Apple', 'Samsung', 'One Plus'];
  }

  submitForm() {
    this.payload = {
      username: localStorage.getItem('email'),
      productName: this.specialOfferForm.controls['productName'].value,
      image: this.blobImage,
      productModel: this.specialOfferForm.controls['productModel'].value,
      isSpecialProduct: true,
      productPrice: this.specialOfferForm.controls['productPrice'].value,
      productQuantity: this.specialOfferForm.controls['productQuantity'].value,
    };

    if (this.payload.image == null) {
      this.payload.image = this.ImagePath;
    }

    this.ngxLoader.start();
    if (this.editMode) {
      this.editOffer();
    } else {
      //this.addOffer()
    }
    this.submitDetails(this.payload);
  }

  submitDetails(recievedValue: any) {
    let newPayload = Object.assign({}, recievedValue);
    this.CmsService.addFeatureProduct(newPayload).subscribe((res) => {
      if (res) {
        this.ngxLoader.stop();
        this.route.navigate(['/cms/special-offer']);
      }
      (error: any) => {
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
        this.ngxLoader.stop();
      };
    });
  }

  getofferList() {
    this.CmsService.getOfferList().subscribe((res: any) => {
      this.offerList = res.response.filter(
        (item) => item.isSpecialProduct === true
      );

      this.ngxLoader.stop();
    });
  }

  addOffer() {
    this.CmsService.addFeatureProduct(this.specialOfferForm.value).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccess(
            'Feature Product added successfully',
            'Product Added'
          );
          this.ngxLoader.stop();
          this.route.navigate(['/cms/special-offer']);
        }
        (error: any) => {
          this.toastr.showError('Somthing wrong Please check', 'Error occured');
          this.ngxLoader.stop();
        };
      }
    );
  }

  editOffer() {
    this.CmsService.editFeature(this.payload, this.id).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'Feature product edit successfully',
          'Feature edit'
        );
        this.ngxLoader.stop();
        this.route.navigate(['/cms/special-offer']);
      }
      (error: any) => {
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
        this.ngxLoader.stop();
        this.route.navigate(['/']);
      };
    });
  }

  getFeatureById() {
    this.CmsService.getFeatureById(this.id).subscribe((res) => {
      const testApi = res;
      const test = this.specialOfferForm.patchValue({
        productName: res.productName,
        image: res.image,
        productModel: res.productModel,
        productPrice: res.productPrice,
        productQuantity: res.productQuantity,
        isSpecialProduct: res.isSpecialProduct,
      });
      this.Image = this.imgbucket.concat(res.image);
      this.ImagePath = this.imgbucket.concat(res.image);

      this.ngxLoader.stop();
    });
  }

  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    this.imageData = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.imageName = event.target.files[0].name;
    reader.onload = (data) => {
      this.Image = data.target.result;
      console.log('image is coming' + this.Image);
    };
  }

  blobToFile(theBlob: any, fileName: any) {
    console.log(
      'blob to file',
      new File([theBlob], fileName, {
        lastModified: new Date().getTime(),
        type: theBlob.type,
      })
    );
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.img = base64ToFile(this.croppedImage);
    this.blobImage = this.blobToFile(this.img, this.imageName);
    // this.img.name = this.imageName;
    //console.log('144', JSON.stringify(this.img.name));
  }

  imageLoaded() {
    / show cropper /;
  }
  cropperReady() {
    / cropper ready /;
  }
  loadImageFailed() {
    / show message /;
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }
}
