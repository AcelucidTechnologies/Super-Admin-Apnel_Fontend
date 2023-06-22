import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ImageCroppedEvent, ImageCropperComponent, base64ToFile } from 'ngx-image-cropper';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service';
import bsCustomFileInput from 'bs-custom-file-input';
import { CommonService } from 'src/app/_services/common';

import { HttpClient } from '@angular/common/http';
import { Console } from 'console';
//import * as customBuild from ""
@Component({
  selector: 'app-add-banner-special',
  templateUrl: './add-banner-special.component.html',
  styleUrls: ['./add-banner-special.component.scss'],
})
export class AddBannerSpecialComponent implements OnInit {
  @ViewChild("image")
  private _image: HTMLImageElement;

  @ViewChild("_cropper1")
  private _cropper1: ImageCropperComponent;

  transform = {
    flipH: false,
    flipV: false,
    rotate: 0,
    scale: 1,
  };
  bannerListbyId: [] = [];
  banner: any[] = [];
  bannerList: any[] = [];
  editData: any[] = [];
  payload: any;
  sidebarSpacing: any;
  title: string = ' ';
  bannerSpecialForm: FormGroup;
  prevImageName: any;
  Image: any =
    'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADp0lEQVR4nO2bSWhUQRCGvyhuiaKCREER94MeAipiEPHmJWrUix4URFFxS4xxuQQdF9zXk4wSQURvbrgvuIEXT17F6MntIEb04JK4FdQLZfscM+Msb3reD8U8eqr7vfq7q7uq+z2IESNGjBgxLCqAWmAdsMkTaQBmAeWkQBmwAXgP/PBUWoFGtfU3dAHOROAB8yWnXRI2OAotQBLY7Ykk1SZro7h4h8/bYX8c6IF/EJuaHXcoRyeHoPCpp8YHENueGXtnSOF6U3AU/5F03SBhCuTad/xhbyImgIxHwEBgvg6ldXpdSQmMgCrgCvAtZI2Vssuq4yUBy4CvnQg22oB6PCNghWPkF+AasF/lupZZneV4QkCV0/N3gWEhesOBew5J4/CAgEtGTwzsnkJX/rtv9M9S5AQMANpNj0ov/wsjzYiR+aAfRUzAXKNzNY2bXTf1JOQuWgLqjc7ONG62x9RbRRETUGd0dmVIwBo8cYFradzshqk3B48mwRGduNEoMwm2axtFvQxeSXMZfGD0pS7FTsB4Xc4C3fvayy5GOca3aV0vQuEGJ8yVIX4TOAAcBG6F5AlSx6tkaKOZD1JJu2625hp909zGy0o6XO2Euq7IHDGZ7EBcah7QBJwCHure5du/pOOfgRfAYx2RJ7XuPHXFfdkgIICExEu0nsjivyRI6UBC5kV6TvGyEyPtfyQRlS2xLhprXNAeTNeQD8CnDOptKTQB4rtLgScpHvKN5h87gAXANGA00CekPTnt6Q8MBiZo/rFaD0cuAs+B79qu/E4vJAG1zh69XTbv6BnemBzctzcwCRgbFOSbgKHao67hr4Ct2nt5RSKPBNTo7G0Nf61bbd0oEBJ5IEB8c5vxv2Co79AhWVAkckyAGH/E6XXx/SlEBIkcEtBVz+Kt8ef1RJpSIOCQY/wRJYVSIGClY7ysxVGAjL7DKhW5IqDaSZ2bw97LKRDq3G26RJYJ6K3JStDm7YgN+5wfjyedMHYQ0UJOCZgYFmuXEgEPTFuy/FFKBMw27XwsRExfaAIemXY2E13khICpzuaE5OQlRcA508Zeoo0/7G00BbKEpYtKs0ssv0MosvcEZ5qClgzeFLUhr5wRRBk9dVsseN4a9H3ZVids7ZHh0reQaBt/wjzrO6BX8GdjSL6e7MSHCE3O3vz2CHwcESbHnJ4XWWvZKQvJ232WU2HJWZlOCtYdfJN32vMpM9NynRgbIvChQ7akQV+N7/D5GDFixIjxi4GfxUF9ZJ3ajNUAAAAASUVORK5CYII';
  fgsType: any;
  imageData: any = null;
  Image1: any;
  status = false;
  id: any;
  apiId: any;
  username: any;
  testapi: any;
  ImagePath: string;
  blobImage:any
  editMode: boolean = false;
  imageMode= false;
  check: boolean;
  fileHolder: File | null;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public config = {
    toolbar: ['heading', '|', 'bold', 'italic', 'custombutton'],
    language: 'en',
  };

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  test: any;
  testadd: any;
  img: any;
  imgpatch: any;
  public imageName: string;
  imagehide: false;
  imageShow: true;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private CmsService: CmsService,
    private common: CommonService,
    private http: HttpClient
  ) {
    this.fileHolder = null;
    this.getbannerList();
    this.bannerSpecialForm = this.fb.group({
      image: ['',Validators.compose([Validators.required])],
      bannerName: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$'
          ),
        ],
      ],
      bannerOrder: ['', [Validators.required, Validators.pattern('[1-9]+')]],
      bannerDescription: ['', [Validators.required]],
    });
    console.log('hellotoken' + this.bannerSpecialForm);
  }



  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
    bsCustomFileInput.init();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true;

        this.title = 'Edit Special Banner';
        this.imagehide=false
        this.imageShow=true
        this.getBannerById();
      } else {
        this.editMode = false;
        this.check=true;
        this.imageShow= true
        this.imagehide=false
        this.title = 'Add New Special Banner';
      }
    });
  }

  getbannerList() {
    this.CmsService.getSpecialBannerList(this.id).subscribe((res) => {
      this.banner = res;
      this.bannerList = res.map((item) => {
        const cleanResponse = item.bannerDescription.replace(/<\/?p>/g, '');
        return { ...item, bannerDescription: cleanResponse };
      });
      this.ngxLoader.stop();
    });
  }


  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }
  submitForm() {

    this.ngxLoader.start();
    this.payload = {
      username: localStorage.getItem('email'),
      bannerName: this.bannerSpecialForm.controls['bannerName'].value,
      image: this.blobImage,
      bannerOrder: this.bannerSpecialForm.controls['bannerOrder'].value,
      bannerDescription:this.bannerSpecialForm.controls['bannerDescription'].value,
    }
    if (this.payload.image == null) {
      this.payload.image = this.Image;
    }
    this.ngxLoader.start();
    if (this.editMode) {

      this.editBanner();
    } else {
      this.submitDetails(this.payload);
      this.check=true

      // this.addCategory()
    }
    this.getbannerList();
  }
  addCategory() {
    this.CmsService.addSpecialBanner(this.bannerSpecialForm.value).subscribe(
      (res) => {
        this.testadd = res;

        if (res) {
          this.toastr.showSuccess(
            'Special banner added successfully',
            'banner Added'
          );

          // this.route.navigate(['/cms/banner'])
        }
        (error: any) => {
          this.toastr.showError('Somthing wrong Please check', 'Error occured');
          this.ngxLoader.stop();
          this.route.navigate(['/']);
        };
      }
    );
  }

  editBanner() {
    this.CmsService.editSpecialBanner(this.payload, this.id).subscribe(
      (res) => {
        if (res) {
          this.toastr.showSuccess('Banner edit successfully', 'banner edit');
          this.ngxLoader.stop();
          this.route.navigate(['/cms/banner']);
        }
        (error: any) => {
          this.toastr.showError('Somthing wrong Please check', 'Error occured');
          this.ngxLoader.stop();
          this.route.navigate(['/']);
        };
      }
    );
  }

  getBannerById() {
    this.CmsService.getBannerById(this.id).subscribe((res) => {
      this.testapi = res;
      console.log("response",res)
      if (res.image) {
        this.Image = res.image;
        this.prevImageName = this.Image.toString().split('.com/Banner/')[1];
        this.imageLoaded();
      }
      console.log("34567890",this.prevImageName)
      this.bannerSpecialForm.patchValue({
        username: res.username,
        bannerName: res.bannerName,
        image: this.prevImageName,
        bannerOrder: res.bannerOrder,
        bannerDescription: res.bannerDescription,
      });
      console.log("group",this.bannerSpecialForm);
      // this.bannerSpecialForm.controls['image'].patchValue({
      //   name: this.prevImageName
      // })
      // console.log(this.bannerSpecialForm)
      // this.ngxLoader.stop();
    });

  }


  submitDetails(recievedValue: any) {
    let newPayload = Object.assign({}, recievedValue);
    this.CmsService.addSpecialBanner(newPayload).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('Banner add successfully', 'banner add');
        this.ngxLoader.stop();
        this.route.navigate(['/cms/banner']);
      } else {
        console.log("error")
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
      }
    });
  }
  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    this.imageData = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.imageName = event.target.files[0].name;
    this.fileHolder = event.target.files[0];
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
      this.blobImage=this.blobToFile(this.img,this.imageName);
    }
  imageLoaded() {

  }
  cropperReady() {
    / cropper ready /;
  }
  loadImageFailed() {
    / show message /;
  }
}
