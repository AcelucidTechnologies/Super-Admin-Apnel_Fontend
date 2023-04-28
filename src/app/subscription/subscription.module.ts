import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { AddonsComponent } from './subscription/addons/addons.component';
import { CoupanComponent } from './subscription/coupan/coupan.component';
import { SharedModule } from '../shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import { PaymentComponent } from './subscription/payment/payment.component';

@NgModule({
  declarations: [
    AddonsComponent,
    CoupanComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SubscriptionRoutingModule,
    MatDividerModule
  ]
})
export class SubscriptionModule { }
