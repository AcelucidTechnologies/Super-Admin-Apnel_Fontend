import { Component, OnInit } from '@angular/core';

export interface Option {
  id: number;
  name: string;
}
@Component({
  selector: 'app-product-option-list',
  templateUrl: './product-option-list.component.html',
  styleUrls: ['./product-option-list.component.scss']
})
export class ProductOptionListComponent implements OnInit {
  options: Option[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
    { id: 5, name: 'Option 5' },
  ];
  dt: any;

  constructor() { }

  ngOnInit(): void {
  }
  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


}
