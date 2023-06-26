import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExitRoutingModule } from './exit-routing.module';
import { AddExitComponent } from './add-exit/add-exit.component';
import { EditExitComponent } from './edit-exit/edit-exit.component';
import { DialogExitComponent } from './dialog-exit/dialog-exit.component';
import { ExitListComponent } from './exit-list/exit-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    AddExitComponent,
    EditExitComponent,
    DialogExitComponent,
    ExitListComponent
  ],
  imports: [
    CommonModule,
    ExitRoutingModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatDividerModule,
    NgxUiLoaderModule,
  ]
})
export class ExitModule { }
