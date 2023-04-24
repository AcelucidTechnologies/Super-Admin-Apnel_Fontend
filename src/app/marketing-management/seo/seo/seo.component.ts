import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {
seoForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
this.seoForm= this.fb.group({
  page: ['',Validators.required],
  title: ['',Validators.required],
  metadiscriptionj: ['',Validators.required],
  metaKeyword: ['',Validators.required]
})
  }
submitForm(){

}
}
