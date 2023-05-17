import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
import { SLIDER } from 'src/app/_models/slider';
import { PAGE } from 'src/app/_models/cms';
import { DialogSelectComponent } from '../dialog-select/dialog-select.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-page-list',
  templateUrl: './add-page-list.component.html',
  styleUrls: ['./add-page-list.component.scss']
})
export class AddPageListComponent implements OnInit {
  options: any[] = [
    { label: 'Select Page', value: 'option1' },
  ];


  pages: SelectItem[];
  sidebarSpacing: any;
  title: string = " "
  pageForm: FormGroup;
  fgsType: any;
  image: File;
  status= false;
  id: any;
  editMode: boolean = false
  payload: any
  imageChangedEvent: any = '';
  croppedImage: any = '';
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  private dialogRefSubscription: Subscription;
  testapi: any;
  pageTitle: string;
  pageLink: string;

  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    public dialog: MatDialog,
    private CmsService: CmsService
    ) {

     }



  ngOnInit(): void {

    this.pageForm = this.fb.group({
      pageTitle: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]],
      pageLink: ['', [Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]],
      pageContent: ['', Validators.required]
    });
    this.CmsService.BehaviouralSubject.subscribe(res=>{
      this.pageForm.patchValue({
        pageTitle: res.pageTitle,
        pageLink: res.pageLink
      });
    })
    console.log("page set up value" + this.pageForm.controls)




    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    });

    // this.getPageId()

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

      pageContent: this.pageForm.controls['pageContent'].value,
      pageTitle:this.pageTitle,
      pageLink: this.pageLink
    }


   this.submitDetails(this.payload)
   console.log("payload", this.payload)
   this.ngxLoader.start();

     this.addPage()

   console.log("payload data for submit button" +  JSON.stringify(this.payload))


   this.route.navigate[('/cms/page')]

   }
   addPage() {
    this.CmsService.addPageLink(this.pageForm.value).subscribe(res => {
       if (res) {
         this.toastr.showSuccess("page added successfully", "Product Added")
         this.ngxLoader.stop()
         this.route.navigate(['/cms/page'])
       }
       (error: any) => {
         this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop()
       }
     })
   }


   submitDetails(recievedValue:any){
    let newPayload= Object.assign({},recievedValue)
    this.CmsService.addPageLink(newPayload)
    .subscribe((res) => {
      console.log(res)
    });
  }

  // addPageSetUp() {
  //   this.CmsService.getPageValue(this.pageForm.value).subscribe(res => {
  //      if (res) {
  //        this.toastr.showSuccess("Slider added successfully", "slider Added")
  //        this.ngxLoader.stop()
  //        this.route.navigate(['/cms/slider'])
  //      }
  //      (error: any) => {
  //        this.toastr.showError("Somthing wrong Please check", "Error occured")
  //        this.ngxLoader.stop()
  //       this.route.navigate(['/'])
  //      }
  //    })
  //  }

   openDialog() {
    const dialogRef = this.dialog.open(DialogSelectComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  // getPageId() {
  //   this.CmsService.getPageById(this.id).subscribe((res) => {
  //     this.testapi = res

  //     console.log("testing apis" + JSON.stringify(this.testapi))
  //     const test =this.pageForm.patchValue({
  //       _id: res._id,
  //       pageTitle: res.pageTitle,
  //       pageLink: res.pageLink,
  //       pageContent: res.pageContent,
  //     })


  //     this.ngxLoader.stop();
  //   })
  // }






}
