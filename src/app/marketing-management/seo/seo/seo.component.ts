import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MarketingService } from 'src/app/_services/marketing';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { CmsService } from '../../../_services/cms.service';
@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {
seoForm: FormGroup;
payload:any;
fgsType :any;
pageList: any;
  constructor(private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService,
    private markettingService : MarketingService,
    private route: Router,
    private CmsService: CmsService) { }

  ngOnInit(): void {
this.seoForm= this.fb.group({
  selectPage: ['',Validators.required],
  metaTitle: ['',Validators.required],
  metaDescription: ['',Validators.required],
  metaKeyword: ['',Validators.required],
})
this.getPageList();
  }
submitForm(){
  this.payload = {
     username: localStorage.getItem("email"),
    selectPage: this.seoForm.controls['selectPage'].value,
    metaTitle: this.seoForm.controls['metaTitle'].value,
    metaDescription: this.seoForm.controls['metaDescription'].value,
    metaKeyword: this.seoForm.controls['metaKeyword'].value,

  }
  this.ngxLoader.start();
  this.addSeo()

}
addSeo() {
  this.markettingService.seo(this.payload).subscribe(res => {
     if (res) {
       this.toastr.showSuccess("Seo added successfully", "")
       this.ngxLoader.stop();
       this.seoForm.reset();
       this.route.navigate(['/marketing/seo'])
     }
     (error: any) => {
       this.toastr.showError("Somthing wrong Please check", "Error occured")
       this.ngxLoader.stop()

     }
   })
 }

 getPageList(){
  this.CmsService.getPageValue().subscribe((res)=>{
    this.pageList=res
    console.log("getlist",this.pageList)
  })
}
}
