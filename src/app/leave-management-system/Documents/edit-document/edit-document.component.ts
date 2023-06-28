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
  imageChangedEvent: any = '';
  appliedToType: string[];
  assetlist:any;
  id:any
  payload:any;
  Image: any;
  employeeList: any[]=[]
  imageData: any = null;
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
      fileName: ['',[Validators.required]],
      employee: ['',[Validators.required]],
      folderName: ['',[Validators.required]],
      fileDescription: ['',[Validators.required]],
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


fileChangeEvent(event) {
  this.imageChangedEvent = event;
  this.imageData = event.target.files[0];
  this.Image = event.target.files[0];
}


 getEditByIDDetail(){
  this.leaveservice.getDocumentById(this.id).subscribe((res)=>{
    console.log("500==>"+JSON.stringify(res))
  this.selectForm.patchValue({
    // image:res.image,
    fileName:res.fileName,
    employee:res.employee,
    givenDate:res.givenDate,
    fileDescription:res.fileDescription,
    folderName:res.folderName,

    toview: {
      employee: res.toview.employee,
      reportingManager: res.toview.reportingManager,
    },
    toDownload: {
      employee: res.toDownload.employee,
      reportingManager: res.toDownload.reportingManager,
    },
  })
  console.log("patched value for document" +  JSON.stringify(this.selectForm.value))
  })
  }


 submit(){
  this.ngxLoader.start();
  if (this.selectForm.valid) {
    this.payload = {
      username: localStorage.getItem('email'),
      image: this.Image,
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
  this.leaveservice.editDocumentList(this.payload, this.id).subscribe((res)=>{
    this.assetlist= res;
       if (res) {
        this.ngxLoader.start();
         this.toastr.showSuccess("Document edited successfully", "Document edited")
       }
       this.route.navigate(['/documents/document-list']);
       (error: any) => {
        console.log("error");
        this.toastr.showError("Somthing wrong Please check", "Error occured")
         this.ngxLoader.stop();
       }

  })


   }
}
