import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { DialogDocumentComponent } from './dialog-document/dialog-document.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    DialogDocumentComponent,
    AddDocumentComponent,
    DocumentListComponent,
    EditDocumentComponent,
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
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
export class DocumentModule { }
