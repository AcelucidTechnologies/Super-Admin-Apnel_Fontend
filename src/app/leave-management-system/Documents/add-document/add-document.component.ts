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
  employeeList: any[]=[]
  selectForm: FormGroup;
  appliedToType: string[];
  assetlist:any;
  payload:any

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private leaveservice: LeaveService,
    private route: Router) {
    this.selectForm = this.fb.group({
      username: localStorage.getItem("email"),
      image: [''],
      fileName: [''],
      employee: [''],
      folderName: [''],
      fileDescription: [''],
      toview: this.fb.group({
        reportingManager: [false],
        employee: [false]
      }),
      toDownload: this.fb.group({
        reportingManager: [false],
        employee: [false]
      })

    });
 }
 getMinimumDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() );
  return currentDate.toISOString().split('T')[0];

}

 ngOnInit(){
   this.getAllEmail()

 }
 getAllEmail() {
  this.leaveservice.getEmail().subscribe((res) => {
    this.employeeList =  res
    // this.employeeList  = res.map(employee => `${employee.employeeFullName} (${employee.email})`);
    this.ngxLoader.stop();
    console.log("email" + JSON.stringify(this.employeeList))
  });
}
 submit(){
  if (this.selectForm.valid) {
  this.payload = {
    username: localStorage.getItem('email'),
    image: this.selectForm.controls['image'].value,
    fileName: this.selectForm.controls['fileName'].value,
    employee:this.selectForm.controls['employee'].value,
    folderName:this.selectForm.controls['folderName'].value,
    fileDescription:this.selectForm.controls['fileDescription'].value,
    toview: {
      employee: this.selectForm.get('toview.employee').value,
      reportingManager: this.selectForm.get('toview.reportingManager').value,
    },
    toDownload: {
      employee: this.selectForm.get('toDownload.employee').value,
      reportingManager: this.selectForm.get('toDownload.reportingManager').value,
    },
  }

  }
  this.ngxLoader.start();
  this.submitDetails(this.payload);
  console.log("submit form value payload 24 ===>"+ JSON.stringify(this.payload));
  // this.leaveservice.createDocument(this.selectForm.value).subscribe((res)=>{
  //   this.assetlist= res;
  //      if (res) {
  //       this.ngxLoader.start();
  //        this.toastr.showSuccess("Document added successfully", "Document Added")
  //      }
  //      (error: any) => {
  //       console.log("error");
  //       this.toastr.showError("Somthing wrong Please check", "Error occured")
  //        this.ngxLoader.stop();
  //      }

  // })

   }

   submitDetails(recievedValue: any) {
    let newPayload = Object.assign({}, recievedValue);
    this.leaveservice.createDocument(newPayload).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('Document added successfully', 'Document add');
        this.ngxLoader.stop();
        this.route.navigate(['/documents/document-list']);
      } else {
        console.log("error")
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
      }
    });
  }

}
