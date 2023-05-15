import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service'

@Component({
  selector: 'app-dialog-select',
  templateUrl: './dialog-select.component.html',
  styleUrls: ['./dialog-select.component.scss']
})
export class DialogSelectComponent implements OnInit {
   selectForm: FormGroup;
   payload:any
  constructor(private fb: FormBuilder,
    private CmsService: CmsService,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    private route: Router) {
    this.selectForm = this.fb.group({
      pageTitle: ['', Validators.required],
      pageLink: ['', Validators.required],
    });
}

  ngOnInit(): void {
    this.ngxLoader.start();
  }

  submitForm(){
    this.payload = {
      pageTitle: this.selectForm.controls['pageTitle'].value,
      pageLink: this.selectForm.controls['pageLink'].value,

   }
   this.submitDetails(this.payload)
   console.log("payload", this.payload)
   this.ngxLoader.start();

     this.addPage()

   console.log("payload data for submit button" +  JSON.stringify(this.payload))


   this.route.navigate[('/cms/page')]

   }

  addPage() {
    this.CmsService.addPageLink(this.selectForm.value).subscribe(res => {
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
}
