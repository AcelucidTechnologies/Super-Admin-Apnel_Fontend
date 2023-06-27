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
  employeeList: any[]=[]
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
      image: [''],
      fileName: [''],
      employee: [''],
      folderName: [''],
      fileDescription: [''],
      toview: this.fb.group({
        employee: [false],
        reportingManager: [false],
      }),
      toDownload: this.fb.group({
        employee: [false],
        reportingManager: [false],
      })

    });
 }
 getMinimumDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() );
  return currentDate.toISOString().split('T')[0];

}
 ngOnInit(){
this.getEditByIDDetail(),
this.getAllEmail()
 }
 getAllEmail() {
  this.leaveservice.getEmail().subscribe((res) => {
    this.employeeList =  res
    this.ngxLoader.stop();
  });
}

 getEditByIDDetail(){
  this.leaveservice.getDocumentById(this.id).subscribe((res)=>{
    console.log("500==>"+JSON.stringify(res))
  this.selectForm.patchValue({
    image:res.image,
    fileName:res.fileName,
    employee:res.employee,
    givenDate:res.givenDate,
    fileDescription:res.fileDescription,
    folderName:res.folderName,

    toview: {
      employee: res.employee,
      reportingManager: res.reportingManager,
    },
    toDownload: {
      employee: res.employee,
      reportingManager: res.reportingManager,
    },
  })
  console.log("patched value for document" +  JSON.stringify(this.selectForm.value))
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
