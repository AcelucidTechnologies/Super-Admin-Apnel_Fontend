import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs';
import { OrdersService } from 'src/app/_services/orders.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styleUrls: ['./edit-order-status.component.scss'],
})
export class EditOrderStatusComponent {
  selectForm: FormGroup;
  orderlist: any;
  id: any;
  payload: any;
  orderTransactin: any;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private orderService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
      console.log('activated route id' + this.id);
    });
    this.selectForm = this.fb.group({
      username: localStorage.getItem('email'),
      orderStatus: ['', [Validators.required]],
    });
    this.selectForm.get('orderStatus').valueChanges.subscribe((value) => {
      this.checkStatusValidity(value);
    });
  }


  ngOnInit() {
    this.getStatusDetail();
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

  getStatusDetail() {
    this.orderService.getOrderStatusById(this.id).subscribe((res) => {
      this.selectForm.patchValue({
        orderStatus: res.orderStatus,
      });
    });
  }

  submit() {
    this.payload = {
      username: localStorage.getItem('email'),
      orderStatus: this.selectForm.controls['orderStatus'].value,
    };
    console.log(this.payload);
    this.orderService
      .editOrderStatusList(this.payload, this.id)
      .subscribe((res) => {
        if (res) {
          this.route.navigate(['/order/order-status']);
        }
      });
  }
}
