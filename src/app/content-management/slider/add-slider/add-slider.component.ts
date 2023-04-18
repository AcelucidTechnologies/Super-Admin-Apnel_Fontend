import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
import { SLIDER } from 'src/app/_models/slider';
@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.scss']
})
export class AddSliderComponent implements OnInit {

  sidebarSpacing: any;
  title: string = " "
  sliderForm: FormGroup;
  fgsType: any;
  image: File;
  status= false;
  id: any;
  editMode: boolean = false
  payload: SLIDER
  imageChangedEvent: any = '';
  croppedImage: any = '';
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private CmsService: CmsService
    ) {
      this.sliderForm = this.fb.group({
        id:['',],
        url: ['', [Validators.required, Validators.pattern(this.reg)]],
        sortby: ['', [Validators.pattern("^[1-5]\d*$")]],
        description: ['', [Validators.required]],
      })
     }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Slider"
        this.getSliderById();
      } else {
        this.editMode = false
        this.title = "Add New Slider"
      }
    });

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

  submitForm(){
   this.payload = {
    id: this.sliderForm.controls['id'].value,
    url: this.sliderForm.controls['url'].value,
    image: this.image,
    description: this.sliderForm.controls['description'].value,
    sortby: this.sliderForm.controls['sortby'].value,
  }
 
  this.ngxLoader.start();
  if (this.editMode) {
   this.editSlider();
  } else {
    this.addCategory()
  }
  this.route.navigate[('/cms/slider')]
  
  }

  addCategory() {
    this.CmsService.addSlider(this.sliderForm.value).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("Slider added successfully", "slider Added")
         this.ngxLoader.stop()
         this.route.navigate(['/cms/slider'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop()
        this.route.navigate(['/'])
       }
     })
   }

   editSlider(){
    console.log(this.payload)
    this.CmsService.editSlider(this.sliderForm.value, this.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("Slider edit successfully", "Slider edit")
        this.ngxLoader.stop()
        this.route.navigate(['/cms/slider'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
   }

   getSliderById() {
    this.CmsService.getBannerById(this.id).subscribe((res: SLIDER) => {
      this.sliderForm.patchValue({
        id: res.id,
        url: res.url,
       // image: res.image,
        sortby: res.sortby,
        description: res.description
      })
      this.ngxLoader.stop();
    })
  }

}
