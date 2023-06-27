import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {

  selectForm: FormGroup;
  appliedToType: string[];
  assetlist:any;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private route: Router) {
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

 }
 submit(){
  this.ngxLoader.start();
  this.leaveservice.createDocument(this.selectForm.value).subscribe((res)=>{
    this.assetlist= res;
       if (res) {
        this.ngxLoader.start();
         this.toastr.showSuccess("Document added successfully", "Document Added")
       }
       (error: any) => {
        console.log("error");
        this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop();
       }

  })

   }

}
