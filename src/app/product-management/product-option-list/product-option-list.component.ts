import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-option-list',
  templateUrl: './product-option-list.component.html',
  styleUrls: ['./product-option-list.component.scss']
})
export class ProductOptionListComponent implements OnInit {
  dt: any;

  constructor() { }

  ngOnInit(): void {
  }
  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


}
