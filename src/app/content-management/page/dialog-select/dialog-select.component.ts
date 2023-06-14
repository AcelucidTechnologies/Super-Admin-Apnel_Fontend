import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-select',
  templateUrl: './dialog-select.component.html',
  styleUrls: ['./dialog-select.component.scss']
})
export class DialogSelectComponent implements OnInit {
   selectForm: FormGroup;
   payload:any
   pageTitle:string
   pageLink:string
   page: any
   fgsType:any;
  constructor(private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private CmsService: CmsService,
    private toastr: ToastrMsgService,
    public dialog: MatDialog,
    private route: Router) {
    this.selectForm = this.fb.group({
      username: localStorage.getItem("email"),
      pageTitle: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]],
      pageLink: ['', [Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]],
    });
}
  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.ngxLoader.stop();
  }

  submitForm(){
  this.ngxLoader.start();
  this.CmsService.createPageSetUpData(this.selectForm.value).subscribe((res)=>{
    this.page= res;
       if (res) {
        this.ngxLoader.start();
         location.reload()
         this.toastr.showSuccess("Page added successfully", "Page Added")
       }
       (error: any) => {
        console.log("error");
        this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop();
       }
  })
  this.route.navigate(['/cms/page']);

   }

}
