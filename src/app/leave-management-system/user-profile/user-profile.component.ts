import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { access } from 'src/app/_models/modulepermission';
import { LeaveService } from 'src/app/_services/leave.service';
import { ModulePermissionService } from 'src/app/_services/module-permission.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

id:any;
 constructor(  private LeaveService: LeaveService,
  private activateRoute: ActivatedRoute,){

 }
leaveres:any
personalInfo:any;
department:any
contactInfo:any;
identityInfo:any;
systemFieldInfo:any
separationInfo:any

  ngOnInit(){
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.id = params.get('id');

    });
    this.getLeaveProfile()
  }

  getLeaveProfile() {
    this.LeaveService.getLeaveProfileById(this.id).subscribe((res) => {
      this.leaveres = res;
      // this.department = this.leaveres.department.department
      this.contactInfo =  this.leaveres?.contactDetails
      this.personalInfo = this.leaveres?.personalDetails;
      this.identityInfo = this.leaveres?.identityInformation
      this.systemFieldInfo = this.leaveres?.systemFields;
      this.separationInfo = this.leaveres?.separationOfDate
      console.log("response 24==>", res);
    });
  }

}
