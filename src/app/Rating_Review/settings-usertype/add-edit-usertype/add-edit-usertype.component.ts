import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { UsertypeService } from 'src/app/_services/usertype.service';

@Component({
  selector: 'app-add-edit-usertype',
  templateUrl: './add-edit-usertype.component.html',
  styleUrls: ['./add-edit-usertype.component.scss'],
})
export class AddEditUserTypeComponent implements OnInit {
  sidebarSpacing: string = 'contracted';
  usertypeForm: FormGroup;
  title:string;
  id:any;
  editMode: boolean = false;
  fgsType:any
  payload:any;
  constructor(
    private usertypeService: UsertypeService,
    private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private route: Router,
    private toastr: ToastrMsgService,
    private activatedRoute:ActivatedRoute) {
      this.usertypeForm = fb.group({
        userType: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        status: ['', [Validators.required]],
      });

      this.activatedRoute.queryParamMap.subscribe((params)=>{
      this.id = parseInt(params.get('serialno'))
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit"
       // this.update= "Update"
        this.getUserTypeById();
      } else {
        this.editMode = false
        this.title = "Add"
        //this.update= "Save"
      }
    })

  }
  statusList: string[] = ['Active', 'InActive'];
  ngOnInit(): void {
    this.fgsType = SPINNER.squareLoader;
  }

  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  // getUsertypeDetail(){
  //   this.usertypeService.getUsertypeDetails(this.id).subscribe((res)=>{
  //     console.log(res[0].ratingCriteria)
  //     this.usertypeForm.patchValue({
  //     usertype:res[0].usertype,
  //     status:res[0].status
  //   })
  //   })
  //   }

  submit() {
    this.ngxLoader.start();
    this.payload = {
      username: localStorage.getItem('email'),
      userType: this.usertypeForm.controls['userType'].value,
      status: this.usertypeForm.controls['status'].value,
    };
    if (this.editMode) {
      this.editUserType()
      } else {
        this.addUserType()
      }

  }


// submitEditedDetails(recievedValue:any){
// let newPayload= Object.assign({},recievedValue)
// this.usertypeService.submitEditedUsertypeDetail(newPayload,this.id).subscribe((res)=>{
//  if(res)
//  this.route.navigate(['/usertypesettings/usertypelist']);
// })
// }
editUserType(){
  //console.log("edit payload"+JSON.stringify(this.payload))
  this.usertypeService.editUserType(this.payload, this.id).subscribe(res => {
    if (res) {
      console.log(res,"edit")
      this.toastr.showSuccess("UserType edit successfully", "UserType edit")
      this.ngxLoader.stop()
      this.route.navigate(['/usertypesettings/usertypelist'])

    }
    (error: any) => {
     this.toastr.showError("Somthing wrong Please check", "Error occured")
      this.ngxLoader.stop()
      this.route.navigate(['/'])
    }
  })
 }


 addUserType() {
  this.usertypeService.createUserTypeList(this.payload).subscribe(res => {
     if (res) {
       this.toastr.showSuccess("UserType added successfully", "Coupan Added")
       //this.ngxLoader.stop()
       this.route.navigate(['/usertypesettings/usertypelist'])
     }
     (error: any) => {
       this.toastr.showError("Somthing wrong Please check", "Error occured")
      // this.ngxLoader.stop()
       this.route.navigate(['/'])
     }
   })
 }


getUserTypeById() {
  this.usertypeService.getUserTypeById(this.id).subscribe((res) => {
  console.log(res,"------>")
    this.usertypeForm.patchValue({
      _id: res._id,
      userType :res.userType,
      status: res.status
    })
   // this.ngxLoader.stop();
  })
}
}
