import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';


@Component({
  selector: 'app-edit-product-option',
  templateUrl: './edit-product-option.component.html',
  styleUrls: ['./edit-product-option.component.scss']
})
export class EditProductOptionComponent {
  selectForm: FormGroup;
  productOptionlist: any;
  id:string
  payload:any

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrMsgService,
    private ProductService: ProductService,
    private route: Router,
    private activatedRoute:ActivatedRoute,
  ) {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.selectForm = this.fb.group({
      username: localStorage.getItem('email'),
      productName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getProductOptionDetail()
  }

  getProductOptionDetail(){
    this.ProductService.getproductOptionById(this.id).subscribe((res)=>{
    this.selectForm.patchValue({
      productName:res.productName,
    })
    })
    }



    submit(){
      this.payload={
        _id: this.id,
        username: localStorage.getItem("email"),
        productName:this.selectForm.controls["productName"].value,

      }
      console.log(this.payload)
      this.ProductService.editproductOptionList(this.payload,this.id).subscribe((res)=>{
        if(res)
        {
          location.reload();
          this.route.navigate(['/product/productOptionList'])
        }
      })

    }

}
