import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTravelComponent } from './add-travel/add-travel.component';
import { DialogTravelComponent } from './dialog-travel/dialog-travel.component';
import { EditTravelComponent } from './edit-travel/edit-travel.component';
import { TravelListComponent } from './travel-list/travel-list.component';

const routes: Routes = [
  {
    path:'travel-list', component: TravelListComponent
  },
  {
    path:'travel-delete', component: DialogTravelComponent
  },
  {
    path:'add-travel', component: AddTravelComponent
  },
  {
    path:'edit-travel', component: EditTravelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRoutingModule { }
