import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs';
import { OrdersService } from 'src/app/_services/orders.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-add-order-status',
  templateUrl: './add-order-status.component.html',
  styleUrls: ['./add-order-status.component.scss'],
})
export class AddOrderStatusComponent {
  selectForm: FormGroup;
  orderlist: any;
  orderTransactin: any;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private orderService: OrdersService,
    private route: Router
  ) {
    this.selectForm = this.fb.group({
      username: localStorage.getItem('email'),
      orderStatus: ['', [Validators.required]],
    });
    this.selectForm.get('orderStatus').valueChanges.subscribe((value) => {
      this.checkStatusValidity(value);
    });
  }
  ngOnInit() {
    this.getOrderTransactionList();
  }

  checkStatusValidity(enteredStatus: string): void {
    if (this.orderTransactin.includes(enteredStatus)) {
      this.toastr.showError('Status already exists!', 'Error');
    }
  }

  getOrderTransactionList() {
    this.orderService
      .getOrderStatusList()
      .pipe(map((res) => res.map((status) => status.orderStatus)))
      .subscribe((data) => {
        this.orderTransactin = data;
        console.log('orderTransactin List:', this.orderTransactin);
        this.ngxLoader.stop();
      });
  }

  submit() {
    this.ngxLoader.start();
    this.orderService
      .createOrderStatus(this.selectForm.value)
      .subscribe((res) => {
        this.orderlist = res;
        if (res) {
          this.ngxLoader.start();
          // location.reload();
          this.toastr.showSuccess(
            'Order Status added successfully',
            'Order Status Added'
          );
        }
        (error: any) => {
          console.log('error');
          this.toastr.showError('Somthing wrong Please check', 'Error occured');
          this.ngxLoader.stop();
        };
        this.route.navigate(['/order/order-status']);
      });
  }
}
