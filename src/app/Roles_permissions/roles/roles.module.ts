import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesListComponent } from './roles-list/roles-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatCardModule } from '@angular/material/card';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { RolesRoutingModule } from './roles-routing.module';
import { DialogComponent } from './dialog/dialog.component';
import { AddEditPermissionComponent } from './add-edit-permission/add-edit-permission.component';
import { AngularMaterialModule } from 'src/app/_modules/angular-material.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [RolesListComponent,DialogComponent, AddEditPermissionComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    MultiSelectModule,
    MatCardModule,
    TableModule,
    InputTextareaModule,
    ConfirmDialogModule,
    MatDialogModule,
    MatButtonModule,
    InputNumberModule,
    AngularMaterialModule,
    MatSlideToggleModule
  ]
})
export class RolesModule { }
