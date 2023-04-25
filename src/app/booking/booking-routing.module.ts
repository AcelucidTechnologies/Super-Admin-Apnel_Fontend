import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingRoutingModule } from './booking-routing-routing.module';
import {SharedModule} from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingOrderListComponent } from './booking-order-list/booking-order-list.component';


@NgModule({
  declarations: [BookingOrderListComponent],
  imports: [
    CommonModule,
    BookingRoutingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BookingRoutingModule { }
