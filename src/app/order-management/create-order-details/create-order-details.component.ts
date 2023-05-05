import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order-details',
  templateUrl: './create-order-details.component.html',
  styleUrls: ['./create-order-details.component.scss']
})
export class CreateOrderDetailsComponent implements OnInit {
  paymentOptions: string[] = ['COD', 'Cash', 'Online Payment', 'Wallet'];
  cars=['maruti','suzuki']
  urls = [];

  constructor() { }

  ngOnInit(): void {
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result);
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

}
