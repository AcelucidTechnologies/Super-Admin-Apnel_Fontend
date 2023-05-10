import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BANNERSPECIAL } from 'src/app/_models/cms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
import bsCustomFileInput from 'bs-custom-file-input';
import { CommonService } from 'src/app/_services/common';
import { ThisReceiver, Token } from '@angular/compiler';
//import * as customBuild from ""
@Component({
  selector: 'app-add-banner-special',
  templateUrl: './add-banner-special.component.html',
  styleUrls: ['./add-banner-special.component.scss']
})
export class AddBannerSpecialComponent implements OnInit {
  bannerListbyId: []=[]
  bannerList: any[]=[]
  editData : any[]=[]
payload:any
  sidebarSpacing: any;
  title: string = " "
  bannerSpecialForm: FormGroup;
  bannerImage: any=null;
  Image:any;
  fgsType: any;

  Image1:any
  status= false;
  id: any;
  apiId:any
  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Banner/";

  testapi:any

  editMode: boolean = false
  imageChangedEvent: any = '';
  croppedImage: any = '';
  //public Editor = customBuild;
  public config={
    toolbar:['heading','|','bold','italic','custombutton'],
    language: 'en'
  }
  //var plainText = content.replace(/<[^>]*>/g, '');

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  test: any;
  testadd : any

  constructor(private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private CmsService: CmsService,
    private common: CommonService
    ) {
      this.bannerSpecialForm = this.fb.group({
        // _id:[''],
        // username: ['', [Validators.required, Validators.pattern(this.reg)]],
        image: [''],
        bannerName: ['',[Validators.required]],
        bannerOrder: ['',[Validators.required]],
        bannerDescription: ['', [Validators.required]],
      })

      const token = localStorage.getItem('token')
      console.log("hellotoken" + token)

     }

  ngOnInit(): void {
    // this.getbannerList()

    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    bsCustomFileInput.init();
    //this.myCkeditorConfig = this.common.getConfig(150,400);
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Special Banner"
        this.editBannerData()
      } else {
        this.editMode = false
        this.title = "Add New Special Banner"
        this.addCategory()
      }
    });
    this.getBannerById()
  }



  fileChangeEvent(event) {
    this.bannerImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (data) => {
      this.Image = data.target.result;
      console.log("hello image" + data.target.result)
      // this.imageChangedEvent = event;
    }



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

  submitForm(){
   this.payload = {
    // id: this.bannerSpecialForm.controls['id'].value,
    bannerName: this.bannerSpecialForm.controls['bannerName'].value,
    image: this.Image,
    bannerOrder: this.bannerSpecialForm.controls['bannerOrder'].value,
    bannerDescription: this.bannerSpecialForm.controls['bannerDescription'].value,
  }

  console.log("payload data for submit button" +  JSON.stringify(this.payload))

  this.ngxLoader.start();
  if (this.editMode) {
  this.editBanner();
  } else {
    this.addCategory()
  }
  this.route.navigate[('/cms/banner')]

  }

  addCategory() {
    this.CmsService.addSpecialBanner(this.bannerSpecialForm.value)
    .subscribe(res => {
      this.testadd = res

      console.log(this.testadd,"testadd--------------------")

       if (res) {
         this.toastr.showSuccess("Special banner added successfully", "banner Added")
         this.ngxLoader.stop()
         this.route.navigate(['/cms/banner'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop()
        this.route.navigate(['/'])
       }
     }
     )
   }

   editBanner(){
    this.CmsService.editSpecialBanner(this.payload,this.id).subscribe(res => {
      console.log(this.test,"copy hello latest edit banner--------------------")
      if (res) {
        this.toastr.showSuccess("Banner edit successfully", "banner edit")
        this.ngxLoader.stop()
        this.route.navigate(['/cms/banner'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
   }

  //  getbannerList() {
  //   this.CmsService.getSpecialBannerList(this.apiId).subscribe((res) => {


  //     this.bannerList = res

  //     console.log(this.bannerList,"bannerlist hello  --------------------")
  //     this.bannerSpecialForm.patchValue({
  //       id: res[0].id,
  //         bannerName: res[0].bannerName,
  //         image: res[0].image,
  //        bannerOrder: res[0].bannerOrder,
  //         bannerDescription: res[0].bannerDescription,
  //       })
  //   })
  // }


  getBannerById() {
    this.CmsService.getBannerById(this.id).subscribe((res) => {
      this.testapi = res

      console.log("testing apis" + JSON.stringify(this.testapi.image))
      this.bannerSpecialForm.patchValue({
        bannerName: res.bannerName,
       image: res.image,
       bannerOrder: res.bannerOrder,
       bannerDescription: res.bannerDescription
      })
      this.ngxLoader.stop();
    })
  }



  editBannerData(){

      this.editData = this.bannerList.filter(item =>
        item._id = this.id
      )
      this.bannerSpecialForm.patchValue({
        // id: this.editData[0].id,
        bannerName: this.editData[0].bannerName,
        image: this.editData[0].image,
        bannerOrder: this.editData[0].bannerOrder,
        descrbannerDescriptioniption: this.editData[0].bannerDescription,
      })
  }


}


