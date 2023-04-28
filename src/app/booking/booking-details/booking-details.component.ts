import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

import { FEATURE } from 'src/app/_models/cms';
import { BOOKING, PRODUCTS } from 'src/app/_models/booking';
import { BookingService } from 'src/app/_services/booking.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  productForm: FormGroup;
  bookingForm: FormGroup;
  sidebarSpacing: any;
  fgsType: any;
  title: string = " "
  id: any;
  payload: BOOKING;
  payloads: PRODUCTS;
  selectedProduct: PRODUCTS[]=[]
  editMode: boolean = false
  disableTextbox =  true

  bookingProduct : PRODUCTS[]=[]
  customer:PRODUCTS[]=[]
  bookingList: BOOKING[];
  productList: PRODUCTS[];
  selectedProducts: BOOKING[]=[]
 @ViewChild('getData') getData: TemplateRef<any>;
 
  constructor(private ngxLoader: NgxUiLoaderService, private fb: FormBuilder,
    private route: Router,
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrMsgService,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group({
      id: [''],
      customerName: ['', [Validators.required]],
      cratedAt: ['', [Validators.required]],
      totalAmount: ['', [Validators.required, Validators.pattern("(\.[0-9]{0,9})?")]],
      status: ['', [Validators.required]],
      lastLogin: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      shipping: ['', [Validators.required]],
      voucher: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      shippingLocation: ['', [Validators.required]],
      total: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
    })

    this.productForm=this.fb.group({
      id:[''],
      product: [''],
      qty: [''],
      category: [''],
      prices: [],
      subTotal: []
    })
    console.log(this.bookingForm)
    this.bookingForm.get('cratedAt').disable();
    this.bookingForm.get('lastLogin').disable();
    this.bookingForm.get('discount').disable();
    this.bookingForm.get('payment').disable();
    this.bookingForm.get('shipping').disable();
    this.bookingForm.get('voucher').disable();
    this.bookingForm.get('shippingLocation').disable();
    this.bookingForm.get('tax').disable();
    this.bookingForm.get('shippingLocation').disable();
    this.bookingForm.get('total').disable();
    this.bookingForm.get('category').disable();
    this.bookingForm.get('price').disable();
  }

  ngOnInit(): void {
    this.getbookingList();
    this.fgsType = SPINNER.squareLoader
    this.ngxLoader.start();
    this.sidebarSpacing = 'contracted';
    this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id && this.id != undefined) {
        this.editMode = true
        this.title = "Edit Feature product"
        this.getBookingById();
      } else {
        this.editMode = false
        this.title = "Add New Product Name"
      }
    });
    this.getProductList();
  }

  submitForm() {
    this.payload = {
      id: this.bookingForm.controls['id'].value,
      customerName: this.bookingForm.controls['customerName'].value,
      cratedAt: this.bookingForm.controls['cratedAt'].value,
      totalAmount: this.bookingForm.controls['totalAmount'].value,
      status: this.bookingForm.controls['status'].value,
      lastLogin: this.bookingForm.controls['lastLogin'].value,
      discount: this.bookingForm.controls['discount'].value,
      payment: this.bookingForm.controls['payment'].value,
      shipping: this.bookingForm.controls['shipping'].value,
      voucher: this.bookingForm.controls['voucher'].value,
      tax: this.bookingForm.controls['tax'].value,
      shippingLocation: this.bookingForm.controls['shippingLocation'].value,
      total: this.bookingForm.controls['total'].value,
      category: this.bookingForm.controls['category'].value,
      price: this.bookingForm.controls['price'].value,
      email: this.bookingForm.controls['email'].value,
      contactNo: this.bookingForm.controls['contactNo'].value,
      country: this.bookingForm.controls['total'].value,
      state: this.bookingForm.controls['category'].value,
      city: this.bookingForm.controls['price'].value,
      ZipCode: this.bookingForm.controls['email'].value,
      address: this.bookingForm.controls['contactNo'].value,
      landmark: this.bookingForm.controls['contactNo'].value,

    }
console.log("125");
    this.ngxLoader.start();
    if (this.editMode) {
      this.editBooking()
    } else {
      this.addBooking()
    }
    console.log("132");
    this.route.navigate(['/booking/order-List'])
    console.log("134");
  }

  submitData() {
    console.log("zxcvbnm,.")
    this.payloads = {
      id: this.productForm.controls['id'].value,
      product: this.productForm.controls['product'].value,
      quantitys: this.productForm.controls['qty'].value,
      category: this.productForm.controls['category'].value,
      prices: this.productForm.controls['prices'].value,
      subTotal: this.productForm.controls['subTotal'].value,
    }

    this.ngxLoader.start();
    this.addProduct();
    this.dialog.closeAll();
    this.route.navigate(['/booking/booking-List'])
    console.log("12345678");
    
  }

  addBooking() {
    this.bookingService.addBokking(this.bookingForm.value).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("booking added successfully", "booking Added")
        this.ngxLoader.stop()
        this.route.navigate(['/booking/order-List'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()
      }
    })
  }

  addProduct() {
    this.bookingService.addBokkingProduct(this.productForm.value).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("product added successfully", "product Added")
        this.ngxLoader.stop()
        this.route.navigate(['/booking/booking-List'])
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured")
        this.ngxLoader.stop()

      }
    })
  }

  editBooking() {
    console.log(this.payload)
    this.bookingService.editBooking(this.bookingForm.value, this.id).subscribe(res => {
      if (res) {
        this.toastr.showSuccess("booking edit successfully", "booking edit");
        this.ngxLoader.stop()
        this.route.navigate(['/booking/order-List']);
      }
      (error: any) => {
        this.toastr.showError("Somthing wrong Please check", "Error occured");
        this.ngxLoader.stop()
        this.route.navigate(['/'])
      }
    })
  }

  getBookingById() {
    this.bookingService.getBookingById(this.id).subscribe((res: BOOKING) => {
      this.bookingForm.patchValue({
        id: res.id,
        customerName: res.customerName,
        cratedAt: res.cratedAt,
        totalAmount: res.totalAmount,
        status: res.status,
        lastLogin: res.lastLogin,
        discount: res.discount,
        payment: res.payment,
        shipping: res.shipping,
        voucher: res.voucher,
        tax: res.tax,
        shippingLocation: res.shippingLocation,
        total: res.total,
        category: res.category,
        price: res.price,
        email: res.email,
        contactNo: res.contactNo,
        country: res.country,
        state: res.state,
        city: res.city,
        ZipCode: res.ZipCode,
        address: res.address,
        landmark: res.landmark
      })
      this.ngxLoader.stop();
    })
  }



  onToggleSidebar(sidebarState: any) {
    if (sidebarState === 'open') {
      this.sidebarSpacing = 'contracted';
    } else {
      this.sidebarSpacing = 'expanded';
    }
  }

  getProductList(){
    this.bookingService.getBookingProductList().subscribe((res: PRODUCTS[]) => {
      this.bookingProduct = res
      //console.log(this.bannerList,"--------------------")
      this.ngxLoader.stop();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.getData);
  }

  getbookingList(){
    this.bookingService.getBookingOrderList().subscribe((res: BOOKING[]) => {
      this.bookingList = res
      //console.log(this.bannerList,"--------------------")
      this.ngxLoader.stop();
    })
  }

}
