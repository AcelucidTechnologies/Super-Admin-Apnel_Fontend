import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-product-submit',
  templateUrl: './dialog-product-submit.component.html',
  styleUrls: ['./dialog-product-submit.component.scss']
})
export class DialogProductSubmitComponent implements OnInit {

  Category = [{ value: 'active', label: 'Rs 1000', inactive: false },
  { value: 'inactive', label: 'Rs 2000', inactive: false }];
  price:String[];
  constructor() {
    this.price = ['Rs 1000', 'Rs 2000', 'Rs 3000', 'Rs 4000' ]
  }

  ngOnInit(): void {
  }

}
