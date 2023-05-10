import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
import { SPECIALOFFER } from 'src/app/_models/cms';
@Component({
  selector: 'app-add-special-offer',
  templateUrl: './add-special-offer.component.html',
  styleUrls: ['./add-special-offer.component.scss']
})
export class AddSpecialOfferComponent implements OnInit {

  specialOfferForm: FormGroup;
  sidebarSpacing: any;
  fgsType: any;
  title: string = " "
  imageChangedEvent: any = '';
  id: any;
  payload: any;
  image: File;
  editMode: boolean = false
  reg= '([A-Za-z0-9]+)';
  croppedImage: any = '';
  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private CmsService: CmsService
    ) {
    this.specialOfferForm = this.fb.group({
      id:[''],
      product: ['', [Validators.required, Validators.pattern(this.reg)]],
      category: ['', [Validators.required]],

    })
    console.log(this.specialOfferForm)
  }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Special offer"
        this.getOfferById()
      } else {
        this.editMode = false
        this.title = "Add New Special offer"
      }
    });
  }

  submitForm(){
    this.payload = {
      _id: this.specialOfferForm.controls['id'].value,
      productName: this.specialOfferForm.controls['product'].value,
      image: this.image,
      productModel: this.specialOfferForm.controls['category'].value,
    }


  this.ngxLoader.start();
  if (this.editMode) {
  this.editOffer()
  } else {
    this.addOffer()
  }
  this.route.navigate[('/cms/special-offer')]
  }

  addOffer() {
    this.CmsService.addOffer(this.specialOfferForm.value).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("Special product added successfully", "Special offer Added")
         this.ngxLoader.stop()
         this.route.navigate(['/cms/special-offer'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop()
        // this.route.navigate(['/'])
       }
     })
   }

   editOffer(){
    console.log(this.payload)
    this.CmsService.editOffer(this.specialOfferForm.value, this.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Special product edit successfully", "Special product edit")
        this.ngxLoader.stop()
        this.route.navigate(['/cms/add-special-offer'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
   }

   getOfferById() {
    this.CmsService.getOfferById(this.id).subscribe((res: SPECIALOFFER) => {
      this.specialOfferForm.patchValue({
        // id: res.id,
        // product: res.product,
       // image: res.image,
        // category: res.category,
      })
      this.ngxLoader.stop();
    })
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
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
