import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingOrderListComponent } from './booking-order-list/booking-order-list.component';

const routes: Routes = [
  {
    path:'order-List', component: BookingOrderListComponent,
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingRoutingModule { }
