import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { runInThisContext } from 'vm';
import { CmsService } from '../../../_services/cms.service'

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
    this.CmsService.BehaviouralSubject.next({
      pageTitle: this.selectForm.controls['pageTitle'].value,
      pageLink: this.selectForm.controls['pageLink'].value
    })
   this.ngxLoader.start();
     this.addPage()
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


}
