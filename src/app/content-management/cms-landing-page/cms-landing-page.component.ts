import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CmsService } from '../../../app/_services/cms.service';



@Component({
  selector: 'app-cms-landing-page',
  templateUrl: './cms-landing-page.component.html',
  styleUrls: ['./cms-landing-page.component.scss']
})

export class CmsLandingPageComponent implements OnInit  {
  cmsLanding: { imageUrl: string; }[];
  featureList : any[]
  offerList : any[]=[]
  imgbucket="https://adminpanelbucket.s3.amazonaws.com/Feature/";


  constructor(
    private CmsService: CmsService,
    private ngxLoader: NgxUiLoaderService,
  ) { }


  ngOnInit(): void {
    this.cmsLanding = [
      {

        imageUrl: 'https://media.istockphoto.com/id/816887330/photo/cms.jpg?b=1&s=170667a&w=0&k=20&c=2lr7M_pcb8Mm3R6wD5x7vWxZ_1ra7Mxon1W2wclWgZ4='
      },
      {

        imageUrl: 'https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/refreshCreative/HeadersThumbnails/icons/IconsLayout5_Display_Thumbnail.jpg'
      },
      {

        imageUrl: 'https://www.searchenginejournal.com/wp-content/uploads/2022/05/saas-homepage-627a32bc41975-sej.png'
      }
  ];
  this.getFeatureList();
  this.getofferList()
  }

  getFeatureList(){
    this.CmsService.getFeatureList().subscribe((res) => {
      this.featureList = res
      console.log(this.featureList," feature list--------------------")
      this.ngxLoader.stop();
    })

  }

  getofferList() {
    this.CmsService.getOfferList().subscribe((res:any) => {
      this.offerList = res.response.filter(item=>item.isSpecialProduct === true)
      console.log(res.response.filter(item=>item.isSpecialProduct === true), "offer list--------------------");


      this.ngxLoader.stop();
    });
  }


}
