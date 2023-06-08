import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserTypeComponent } from './usertype-list/usertype.component';
import { SettingUsertypeRoutingModule } from './setting-usertype-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatCardModule } from '@angular/material/card';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddEditUserTypeComponent } from './add-edit-usertype/add-edit-usertype.component';
import { DialogComponent } from './dialog/dialog.component';
import { RatingReviewDetailsComponent } from './rating-review-details/rating-review-details.component';
// import { SharedModule } from '../shared/shared.module';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [UserTypeComponent, AddEditUserTypeComponent,DialogComponent, RatingReviewDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MultiSelectModule,
    MatCardModule,
    TableModule,
    InputTextareaModule,ConfirmDialogModule,
    MatDialogModule,
    MatButtonModule,
    SettingUsertypeRoutingModule,
    ProgressBarModule,

  ],
  providers: [DatePipe],
})
export class SettingUsertypeModule { }
