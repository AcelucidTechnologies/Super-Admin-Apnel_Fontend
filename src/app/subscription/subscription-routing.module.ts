import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubscriptionComponent } from './subscription/add-subscription/add-subscription.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { CoupanComponent } from './subscription/coupan/coupan.component';
import { AddonsComponent } from './subscription/addons/addons.component';
import { PaymentComponent } from './subscription/payment/payment.component';

const routes: Routes = [
  {
    path: "add-subscription", component: AddSubscriptionComponent
  },
  {
    path: "subscription-list", component: SubscriptionListComponent
  },
  {
    path: "add-coupan", component: CoupanComponent
  },
  {
    path: "add-addons", component: AddonsComponent
  },
  {
    path: "payment", component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
