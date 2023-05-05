import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuardService as AuthGuard } from '../_services/auth-guard.service';
import { OrderTransactionComponent } from './order-transaction/order-transaction.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';
import { AddEditOrdersComponent } from './add-edit-orders/add-edit-orders.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { DeliveredOrderComponent } from './delivered-order/delivered-order.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { ConfirmedOrderComponent } from './confirmed-order/confirmed-order.component';
import { PendingOrderComponent } from './pending-order/pending-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-status', component: OrderTransactionComponent
  },
  {
    path: 'transaction-details', component: TransactionDetailsComponent
  },
  {
    path: 'shipment', component: ShipmentComponent
  },
  {
    path: 'shipment-details', component: ShipmentDetailsComponent
  },
  {
    path: 'createOrder', component: AddEditOrdersComponent
  },
  {
    path: 'editOrder', component: AddEditOrdersComponent
  },
  {
    path: 'deliveredOrder', component: DeliveredOrderComponent
  },
  {
    path: 'pendingOrder', component: PendingOrderComponent
  },
  {
    path: 'returnOrder', component: CancelOrderComponent
  },
  {
    path: 'confirmOrder', component: ConfirmedOrderComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
