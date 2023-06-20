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
  DefaultImage: any =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALgAuAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQUGBAMC/8QANxAAAgIBAgMFBAgGAwAAAAAAAAECAwQFESExQRITIlFhMlJxgRQjQnKRocHRBhUkQ2OxNGKS/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AN6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPXHxrsmXZpg5eb6L5lpTofXIt29IfuBTDc0tekYcOdbn96TPX+X4m230eH4AZUGmnpWFL+12futo5LtDhtvRbJPynxApAdGThZGNu7YeH3o8Uc4AAAAAAAAAAAAAAAAAAAC20/SXYlblcI9ILr8T00fTtuzk3rdvjCL6epcgfMIRhFRhFRiuiPoAAAAAAAPitnxRU6hpEJp2YvhnzcOj/YtgBjZRlCTjOLjJc0+hBo9V09ZUO8rSVsV/6XkzOPdPZpprg0AAAAAAAAAAAAAADu0nE+lZPjX1cPE/XyRwmm0ijuMOG62lPxSA7UtlsuQAAAkAQCQBAJAEAkAQUWu4nYn9JrXCXCfx6F8eWTTG+iyqXKS2+YGQBMouEnGXNPZkAAAAAAAAAAAB6UV97fXX70kjXLhwXQzGlR31Cn0e/5GoAEoglAAAAAAAAAAAAAAGX1evus+xL7Xi/E4y0/iBf1kH/jX+2VYAAAAAAAAAAAdelPs6hS31e35GoMhRPur67Pdkma9NPigBKIJQAAAAAAAAAAAAABn/4gf9ZWv8f6sqzt1ezvM+3blHaJxAAAAAAAAAAAANNpN6vw47vxQ8L+RmTt0rLWLk+J/VT4P08mBpiUQvQlAAAAAAAAAAAAPLJujRRO2XKK3+J6lFruX25/Rq34Y8Z/HyAqZSc5OUnvJvdsgAAAAAAAAAAAAAAAu9H1BNLGulx5Qk+voXJiy30/V+wlVlNuPSf7gXoPmE4zj2oNNeaZ9AAAAAAAEN7Ld8iq1DV4QTrxX2p+/wBEB66rnrGh3dbXfSXD/qvMzrbbbbbb57ibc5OUm5SfFt82QAAAAAAAAAAAAAAAAAB60Y12RwqrlL122R2S0bKVfaTg5L7G/EDkx8m7HlvTY4+nRlpRrvS+r5wf6Mp7K51y7M4SjLykj5A00NWw5Ljb2X5STPT+Y4e3/Jr/ABMqANPLVMOP95P7qZy3a5BcKanJ+cnsUQA6cnOyMndWWbR9yPBHN0JScntFNvyR306Rk2Q7TSr8oyfECvB0ZGFkY/G2p7e8uKOcAAAAAAAAAAAAB642PZk3Rqq23fnyQHzTVO+arqi5SfQvMPR6q9p5H1k/Lov3OzDxK8SpQrXHrJ82dIERSitopJLkkSAB8W1Qtj2bYRkvKS3OC7RsWfsqdf3WWQApJ6E/sZHD1gfD0K7pdD8GXwAo46FP7eQvlE6KtFx4e3Kdno3svyLQAeVOPTQtqq4x+CPUACHxODM0unI4x+rn5x5P4osABkcrFtxLOzdHbf2ZLkzxNffTC+t12xUoszWoYc8O3svxQfsS/R+oHKAAAAAAD8gJS3aS5vkabTMKOJRxX1k+M3+hV6Hjd7kO2S8NfL4mhAjYAASAAAAAAAAAAAAAAAAeOVjwyaZVz5Pk/J+Z7ADHXVSpunVNeKL2Z8F3r+NvCORBcY8J/DoUgAAAAwANRpVHcYVcX7Ul2pfM7AAAAAAAAAAAAAAAAAAAAAAADzyKldTOuXKS2MjOLhNwlzi9mAB8gAD/2Q==';


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
