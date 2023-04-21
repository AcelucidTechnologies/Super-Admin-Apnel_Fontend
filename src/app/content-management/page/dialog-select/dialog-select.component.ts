import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-select',
  templateUrl: './dialog-select.component.html',
  styleUrls: ['./dialog-select.component.scss']
})
export class DialogSelectComponent implements OnInit {
   selectForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
