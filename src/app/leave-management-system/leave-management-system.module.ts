import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveManagementSystemRoutingModule } from './leave-management-system-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DialogDepartmentComponent } from './dialog-department/dialog-department.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'primeng/api';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { DialogDesignationComponent } from './dialog-designation/dialog-designation.component';
import { DialogLocationComponent } from './dialog-location/dialog-location.component';
import { DialogSourceHiringComponent } from './dialog-source-hiring/dialog-source-hiring.component';
import { DialogReportingManagerComponent } from './dialog-reporting-manager/dialog-reporting-manager.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ButtonModule } from 'primeng/button';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { TeamComponent } from './team/team.component';
import { CalenderComponent } from './calender/calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { LeaveTrackerComponent } from './leave-tracker/leave-tracker.component';
import { LeaveApplyComponent } from './leave-apply/leave-apply.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { LeaveApproveDisapproveComponent } from './leave-approve-disapprove/leave-approve-disapprove.component';

const plugins = [dayGridPlugin, timeGridPlugin];

const calendarOptions: CalendarOptions = {
  plugins,
  // other options
};


@NgModule({
  declarations: [
    UserProfileComponent,
    AddProfileComponent,
    EditProfileComponent,
    DialogDepartmentComponent,
    DialogDesignationComponent,
    DialogLocationComponent,
    DialogSourceHiringComponent,
    DialogReportingManagerComponent,
    ProfileListComponent,
    ProfileDialogComponent,
    TeamComponent,
    CalenderComponent,
    LeaveTrackerComponent,
    LeaveApplyComponent,
    LeaveApproveDisapproveComponent,


  ],
  imports: [
    CommonModule,
    LeaveManagementSystemRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    NgxUiLoaderModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FullCalendarModule,
    CKEditorModule,

  ],
  providers: [
    {
      provide: 'calendarOptions',
      useValue: calendarOptions,
    },
  ],
})
export class LeaveManagementSystemModule { }
