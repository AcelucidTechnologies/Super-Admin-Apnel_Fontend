import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';
import { OrderTransactionComponent } from './order-transaction/order-transaction.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { ConfirmedOrderComponent } from './confirmed-order/confirmed-order.component';
import { DeliveredOrderComponent } from './delivered-order/delivered-order.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';
import { AddEditOrdersComponent } from './add-edit-orders/add-edit-orders.component';
import {FormControl, FormGroup, FormsModule,PatternValidator,ReactiveFormsModule, Validators} from '@angular/forms';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { PendingOrderComponent } from './pending-order/pending-order.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogOrderStatusComponent } from './dialog-order-status/dialog-order-status.component';
import { DialogCreateOrderComponent } from './dialog-create-order/dialog-create-order.component';
import { CreateOrderDetailsComponent } from './create-order-details/create-order-details.component';
import { CreateOrderListComponent } from './create-order-list/create-order-list.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderTransactionComponent,
    CancelOrderComponent,
    ConfirmedOrderComponent,
    DeliveredOrderComponent,
    ShipmentComponent,
    ShipmentDetailsComponent,
    AddEditOrdersComponent,
    TransactionDetailsComponent,
    PendingOrderComponent,
    DialogOrderStatusComponent,
    DialogCreateOrderComponent,
    CreateOrderDetailsComponent,
    CreateOrderListComponent
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,

  ]
})
export class OrderManagementModule { }
