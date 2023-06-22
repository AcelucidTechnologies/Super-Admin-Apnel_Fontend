import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AddAssetComponent } from './Asset/add-asset/add-asset.component';
import { AssetDialogComponent } from './Asset/asset-dialog/asset-dialog.component';
import { AssetListComponent } from './Asset/asset-list/asset-list.component';
import { EditAssetComponent } from './Asset/edit-asset/edit-asset.component';
import { CalenderComponent } from './calender/calender.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LeaveApplyComponent } from './leave-apply/leave-apply.component';
import { LeaveApproveDisapproveComponent } from './leave-approve-disapprove/leave-approve-disapprove.component';
import { LeaveTrackerComponent } from './leave-tracker/leave-tracker.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { TeamComponent } from './team/team.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path:'user-profile', component: UserProfileComponent
  },
  {
    path:'add-profile', component: AddProfileComponent
  },
  {
    path:'edit-profile', component: EditProfileComponent
  },
  {
    path:'profile-list', component: ProfileListComponent
  },
  {
    path:'team', component: TeamComponent
  },
  {
    path:'calender', component: CalenderComponent
  },
  {
    path:'leave-tracker', component: LeaveTrackerComponent
  },
  {
    path:'leave-apply', component: LeaveApplyComponent
  },
  {
    path:'leave-approve-disapprove', component: LeaveApproveDisapproveComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveManagementSystemRoutingModule { }
