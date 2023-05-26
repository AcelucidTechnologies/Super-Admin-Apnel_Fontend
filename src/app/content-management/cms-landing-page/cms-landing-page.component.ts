import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
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
  bannerList: any;
  sliderList:any;
  page: any;
  fgsType:any;

  constructor(
    private CmsService: CmsService,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.ngxLoader.start();
    this.fgsType = SPINNER.squareLoader
  this.getFeatureList();
  this.getofferList();
  this.getBannerList();
  this.getSliderList();
  this.getPage();
  this.ngxLoader.stop();
  }

  getFeatureList(){
    this.CmsService.getFeatureList().subscribe((res) => {
      this.featureList = res
      this.featureList = res.filter(item=>item.isSpecialProduct === false)
    })

  }

  getofferList() {
    this.CmsService.getOfferList().subscribe((res:any) => {
      this.offerList = res.response.filter(item=>item.isSpecialProduct === true)

    });
  }

  getBannerList(){
    this.CmsService.getbannerList().subscribe((res)=>{
      this.bannerList= res
    })
  }

  getSliderList(){
    this.CmsService.getSliderList().subscribe((res)=>{
      this.sliderList= res;
    })
  }

  getPage(){
    this.CmsService.getPageValue().subscribe((res)=>{
      this.page=res
    })
  }
  }

