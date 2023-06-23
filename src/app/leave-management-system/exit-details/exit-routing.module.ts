import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExitComponent } from './add-exit/add-exit.component';
import { DialogExitComponent } from './dialog-exit/dialog-exit.component';
import { EditExitComponent } from './edit-exit/edit-exit.component';
import { ExitListComponent } from './exit-list/exit-list.component';

const routes: Routes = [
  {
    path:'exit-list', component: ExitListComponent
  },
  {
    path:'exit-delete', component: DialogExitComponent
  },
  {
    path:'add-exit', component: AddExitComponent
  },
  {
    path:'edit-exit', component: EditExitComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExitRoutingModule { }
