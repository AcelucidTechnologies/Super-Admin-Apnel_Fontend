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
  ImagePath: string;
  fgsType: any;
  image: File;
  status= false;
  id: any;
  editMode: boolean = false
  payload: any
  imageChangedEvent: any = '';
  croppedImage: any = '';
  Image:any="data:image/jpeg;base64,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";

  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Feature/";

  imageData: any=null;

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private CmsService: CmsService
    ) {
      this.sliderForm = this.fb.group({
        // id:['',],
        sliderName: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]],
        sliderOrder: ['',[Validators.required, Validators.pattern('[0-9]+')]],
        sliderDiscription: ['', [Validators.required]],
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
    // id: this.sliderForm.controls['id'].value,
    sliderName: this.sliderForm.controls['sliderName'].value,
    image:this.imageData,
    sliderOrder: this.sliderForm.controls['sliderOrder'].value,
    sliderDiscription: this.sliderForm.controls['sliderDiscription'].value,
  }
  if(this.payload.image  == null){
    this.payload.image = this.ImagePath
  }

  this.submitDetails(this.payload)

  console.log("payload data for submit button feature"  +  JSON.stringify(this.payload))

  this.ngxLoader.start();
  if (this.editMode) {
   this.editSlider();
  } else {
    this.addCategory()
  }
  this.route.navigate(['/cms/slider'])

  }
  submitDetails(recievedValue:any){
    let newPayload= Object.assign({},recievedValue)
    this.CmsService.addSlider(newPayload)
    .subscribe((res) => {
      console.log(res)
    });
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
    this.CmsService.editSlider(this.payload, this.id).subscribe(res => {
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
    this.CmsService.getSliderById(this.id).subscribe((res) => {
      const test = res
      console.log("slider by id" + JSON.stringify(test))
      this.sliderForm.patchValue({
      sliderName: res.sliderName,
       image: res.image,
       sliderOrder: res.sliderOrder,
        sliderDiscription: res.sliderDiscription
      })
      this.Image = this.imgbucket.concat(res.image)
      // this.ImagePath = res.image
      this.ImagePath = this.imgbucket.concat(res.image)
      console.log("get slider bu id image" + this.Image)
      this.ngxLoader.stop();
    })
  }

  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    this.imageData = event.target.files[0];
    this.ImagePath = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (data) => {
      this.Image = data.target.result;
      console.log("slider image" + this.Image)
    }
  }

}
