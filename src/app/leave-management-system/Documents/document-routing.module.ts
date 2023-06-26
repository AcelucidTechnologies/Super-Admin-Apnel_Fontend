import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DialogDocumentComponent } from './dialog-document/dialog-document.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';

const routes: Routes = [
  {
    path:'document-list', component: DocumentListComponent
  },
  {
    path:'document-delete', component: DialogDocumentComponent
  },
  {
    path:'add-document', component: AddDocumentComponent
  },
  {
    path:'edit-document', component: EditDocumentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
