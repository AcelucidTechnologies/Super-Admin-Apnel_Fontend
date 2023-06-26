import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent {

  selectForm: FormGroup;
  appliedToType: string[];
  assetlist:any;
  id:any

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private activatedRoute:ActivatedRoute,
    private route: Router) {
      this.activatedRoute.queryParamMap.subscribe(params => {
        this.id = params.get('id');
      })
    this.selectForm = this.fb.group({
      username: localStorage.getItem("email"),
      employee: ['',[Validators.required] ],
      fileDescription: ['',[Validators.required]],
      toview: ['',[Validators.required]],
      toDownload: ['',[Validators.required]],
      folderName: [''],
      fileName: [''],

    });
 }
 getMinimumDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() );
  return currentDate.toISOString().split('T')[0];

}
 ngOnInit(){
this.getEditByIDDetail()
 }

 getEditByIDDetail(){
  this.leaveservice.getDocumentById(this.id).subscribe((res)=>{
  this.selectForm.patchValue({
    employee:res.employee,
    fileDescription:res.fileDescription,
    toview:res.toview,
    givenDate:res.givenDate,
    toDownload:res.toDownload,
    folderName:res.folderName,
    fileName:res.fileName,
  })
  })
  }


 submit(){
  this.ngxLoader.start();
  this.leaveservice.editDocumentList(this.selectForm.value, this.id).subscribe((res)=>{
    this.assetlist= res;
       if (res) {
        this.ngxLoader.start();
         this.toastr.showSuccess("Document edited successfully", "Document edited")
       }
       (error: any) => {
        console.log("error");
        this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop();
       }

  })

   }
}
