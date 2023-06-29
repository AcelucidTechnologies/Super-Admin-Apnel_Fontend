import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  id:any;
  fgsType:any
 constructor(  private LeaveService: LeaveService,
  private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrMsgService,
  private activateRoute: ActivatedRoute,){
    this.fgsType = SPINNER.squareLoader;

 }
leaveres:any
profileList: any[]=[]
departmentList:any=[]
personalInfo:any;
department:any
contactInfo:any;
identityInfo:any;
systemFieldInfo:any
separationInfo:any

  ngOnInit(){
    this.fgsType = SPINNER.squareLoader;
    this.ngxLoader.start();
    this.getAllProfile(),
    this.getAlldepartment()
  }


  getAlldepartment() {
    this.LeaveService.getdepartmentList().subscribe((res) => {
      this.departmentList=res
      this.ngxLoader.stop();
    });
  }
  getAllProfile() {
    this.LeaveService.getProfileList().subscribe((res) => {
      this.profileList =res
      this.ngxLoader.stop();
    });
  }

  getCountByDepartment(department: any): number {

    return this.profileList.filter((profile) => profile.department === department).length;
  }



  getUniqueDepartments(profileList: any[]): string[] {
    return [...new Set(profileList.map(profile => profile.department))];
  }





}

