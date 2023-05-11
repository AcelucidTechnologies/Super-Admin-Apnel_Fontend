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

@Component({
  selector: 'app-add-page-list',
  templateUrl: './add-page-list.component.html',
  styleUrls: ['./add-page-list.component.scss']
})
export class AddPageListComponent implements OnInit {

  pages: SelectItem[];
  sidebarSpacing: any;
  title: string = " "
  pageForm: FormGroup;
  fgsType: any;
  image: File;
  status= false;
  id: any;
  editMode: boolean = false
  payload: PAGE
  imageChangedEvent: any = '';
  croppedImage: any = '';
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    public dialog: MatDialog,
    private CmsService: CmsService
    ) {
      this.pageForm = this.fb.group({
        id:['',],
        link: ['', [Validators.required, Validators.pattern(this.reg)]],
        page: ['', [Validators.pattern("^[1-5]\d*$")]],
        description: ['', [Validators.required]],
      })
      this.pages = [
        { label: 'Select Page', value: 'home' },

      ];
     }

  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
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
    id: this.pageForm.controls['id'].value,
    url: this.pageForm.controls['url'].value,
    description: this.pageForm.controls['description'].value,
    page: this.pageForm.controls['page'].value,
  }

  this.ngxLoader.start();
  this.route.navigate[('/cms/page')]

  }

  addCategory() {
    this.CmsService.addSlider(this.pageForm.value).subscribe(res => {
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

   openDialog() {
    const dialogRef = this.dialog.open(DialogSelectComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
