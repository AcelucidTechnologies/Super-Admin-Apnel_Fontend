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
import { CreateOrderDetailsComponent } from './create-order-details/create-order-details.component';
import { CreateOrderListComponent } from './create-order-list/create-order-list.component';
import { AddOrderStatusComponent } from './add-order-status/add-order-status.component';
import { EditOrderStatusComponent } from './edit-order-status/edit-order-status.component';

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
  },
  {
    path: 'createOrderDeatils', component: CreateOrderDetailsComponent
  },
  {
    path: 'createOrderList', component: CreateOrderListComponent
  },
  {
    path: 'add-order-status', component: AddOrderStatusComponent
  },
  {
    path: 'edit-order-status', component: EditOrderStatusComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
