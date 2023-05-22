import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ImageCroppedEvent,base64ToFile } from 'ngx-image-cropper';
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
  sliderList: SLIDER[]=[]
  image: File;
  status= false;
  id: any;
  editMode: boolean = false
  payload: any
  imageChangedEvent: any = '';
  croppedImage: any = '';
  Image: any =
    'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADp0lEQVR4nO2bSWhUQRCGvyhuiaKCREER94MeAipiEPHmJWrUix4URFFxS4xxuQQdF9zXk4wSQURvbrgvuIEXT17F6MntIEb04JK4FdQLZfscM+Msb3reD8U8eqr7vfq7q7uq+z2IESNGjBgxLCqAWmAdsMkTaQBmAeWkQBmwAXgP/PBUWoFGtfU3dAHOROAB8yWnXRI2OAotQBLY7Ykk1SZro7h4h8/bYX8c6IF/EJuaHXcoRyeHoPCpp8YHENueGXtnSOF6U3AU/5F03SBhCuTad/xhbyImgIxHwEBgvg6ldXpdSQmMgCrgCvAtZI2Vssuq4yUBy4CvnQg22oB6PCNghWPkF+AasF/lupZZneV4QkCV0/N3gWEhesOBew5J4/CAgEtGTwzsnkJX/rtv9M9S5AQMANpNj0ov/wsjzYiR+aAfRUzAXKNzNY2bXTf1JOQuWgLqjc7ONG62x9RbRRETUGd0dmVIwBo8cYFradzshqk3B48mwRGduNEoMwm2axtFvQxeSXMZfGD0pS7FTsB4Xc4C3fvayy5GOca3aV0vQuEGJ8yVIX4TOAAcBG6F5AlSx6tkaKOZD1JJu2625hp909zGy0o6XO2Euq7IHDGZ7EBcah7QBJwCHure5du/pOOfgRfAYx2RJ7XuPHXFfdkgIICExEu0nsjivyRI6UBC5kV6TvGyEyPtfyQRlS2xLhprXNAeTNeQD8CnDOptKTQB4rtLgScpHvKN5h87gAXANGA00CekPTnt6Q8MBiZo/rFaD0cuAs+B79qu/E4vJAG1zh69XTbv6BnemBzctzcwCRgbFOSbgKHao67hr4Ct2nt5RSKPBNTo7G0Nf61bbd0oEBJ5IEB8c5vxv2Co79AhWVAkckyAGH/E6XXx/SlEBIkcEtBVz+Kt8ef1RJpSIOCQY/wRJYVSIGClY7ysxVGAjL7DKhW5IqDaSZ2bw97LKRDq3G26RJYJ6K3JStDm7YgN+5wfjyedMHYQ0UJOCZgYFmuXEgEPTFuy/FFKBMw27XwsRExfaAIemXY2E13khICpzuaE5OQlRcA508Zeoo0/7G00BbKEpYtKs0ssv0MosvcEZ5qClgzeFLUhr5wRRBk9dVsseN4a9H3ZVids7ZHh0reQaBt/wjzrO6BX8GdjSL6e7MSHCE3O3vz2CHwcESbHnJ4XWWvZKQvJ232WU2HJWZlOCtYdfJN32vMpM9NynRgbIvChQ7akQV+N7/D5GDFixIjxi4GfxUF9ZJ3ajNUAAAAASUVORK5CYII';

  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Feature/";
  blobImage:any;img: any;
  public imageName: string;
  imageData: any=null;

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  test: any;

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
    username: localStorage.getItem('email'),
    sliderName: this.sliderForm.controls['sliderName'].value,
    image:this.blobImage,
    sliderOrder: this.sliderForm.controls['sliderOrder'].value,
    sliderDiscription: this.sliderForm.controls['sliderDiscription'].value,
  }
  if(this.payload.image  == null){
    this.payload.image = this.ImagePath
  }

  this.ngxLoader.start();
  if (this.editMode) {
   this.editSlider();
  } else {
    this.submitDetails(this.payload)
  }

  }

  submitDetails(recievedValue:any){
    this.ngxLoader.start();
    let newPayload= Object.assign({},recievedValue)
    this.CmsService.addSlider(newPayload)
    .subscribe((res) => {
      if (res) {
        this.toastr.showSuccess("Slider added successfully", "slider Added")
        this.route.navigate(['/cms/slider'])
        this.ngxLoader.stop();
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
      }
      console.log(res)
    });
  }


  getSliderList() {
    this.CmsService.getSliderList().subscribe((res) => {
      this.sliderList = res.map((item) => {
        const cleanResponse = item.sliderDiscription.replace(/<\/?p>/g, '');
        return { ...item, sliderDiscription: cleanResponse };
      });

      console.log(this.sliderList,"--------------------")
      this.ngxLoader.stop();
    })
  }

  // addCategory() {
  //   this.CmsService.addSlider(this.sliderForm.value).subscribe(res => {
  //      if (res) {

  //        this.ngxLoader.stop()
  //        this.route.navigate(['/cms/slider'])
  //        this.toastr.showSuccess("Slider added successfully", "slider Added")
  //      }
  //      (error: any) => {
  //        this.toastr.showError("Somthing wrong Please check", "Error occured")
  //        this.ngxLoader.stop()
  //       this.route.navigate(['/'])
  //      }
  //    })
  //  }

   editSlider(){
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
       this.test = res;
     const test1= this.sliderForm.patchValue({
      sliderName: res.sliderName,
       image: res.image,
       sliderOrder: res.sliderOrder,
        sliderDiscription: res.sliderDiscription
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

    //this.ImagePath = event.target.files[0];
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
  imageLoaded() {
    / show cropper /
}
cropperReady() {
    / cropper ready /
}
loadImageFailed() {
    / show message /
}

}
