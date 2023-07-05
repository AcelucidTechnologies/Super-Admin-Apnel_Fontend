import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelRoutingModule } from './travel-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AddTravelComponent } from './add-travel/add-travel.component';
import { EditTravelComponent } from './edit-travel/edit-travel.component';
import { DialogTravelComponent } from './dialog-travel/dialog-travel.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AddTravelComponent,
    EditTravelComponent,
    DialogTravelComponent,
    TravelListComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    NgxUiLoaderModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class TravelModule { }
