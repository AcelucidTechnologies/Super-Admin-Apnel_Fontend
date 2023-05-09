import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingRoutingModule } from './order-routing-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';


@NgModule({
  declarations: [
    CreateOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingRoutingModule
  ]
})
export class OrderRoutingModule { }
