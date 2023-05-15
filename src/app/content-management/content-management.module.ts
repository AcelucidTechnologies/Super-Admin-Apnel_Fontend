import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementRoutingModule } from './content-management-routing.module';
import { CategoryComponent } from './banner/category/category.component';
import { SubCategoryComponent } from './banner/sub-category/sub-category.component';
import { SponsorComponent } from './banner/sponsor/sponsor.component';
import { AddEditCategoryComponent } from './banner/add-edit-category/add-edit-category.component';
import { AddEditSubcategoryComponent } from './banner/add-edit-subcategory/add-edit-subcategory.component';
import { AddEditSponsorComponent } from './banner/add-edit-sponsor/add-edit-sponsor.component';
import { SharedModule } from '../shared/shared.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Slider1Component } from './slider/slider1/slider1.component';
import { BannerSpecialComponent } from './banner-special/banner-special/banner-special.component';
import { AddBannerSpecialComponent } from './banner-special/add-banner-special/add-banner-special.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FeatureProductListComponent } from './feature-product/feature-product-list/feature-product-list.component';
import { AddFeatureProductComponent } from './feature-product/add-feature-product/add-feature-product.component';
import { BannerDialogComponent } from './banner-special/banner-dialog/banner-dialog.component';

import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddSliderComponent } from './slider/add-slider/add-slider.component';
import { DialogFeatureComponent } from './feature-product/dialog-feature/dialog-feature.component';
import { SliderDialogComponent } from './slider/slider-dialog/slider-dialog.component';
import { CKEditorModule } from 'ckeditor4-angular';

import { SpecialOfferListComponent } from './special-offer/special-offer-list/special-offer-list.component';
import { AddSpecialOfferComponent } from './special-offer/add-special-offer/add-special-offer.component';
import { DialogSpecialOfferComponent } from './special-offer/dialog-special-offer/dialog-special-offer.component';
import { PageListComponent } from './page/page-list/page-list.component';
import { AddPageListComponent } from './page/add-page-list/add-page-list.component';
import { DialogSelectComponent } from './page/dialog-select/dialog-select.component';
import { CmsLandingPageComponent } from './cms-landing-page/cms-landing-page.component';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    SponsorComponent,
    AddEditCategoryComponent,
    AddEditSubcategoryComponent,
    AddEditSponsorComponent,
    Slider1Component,
    BannerSpecialComponent,
    AddBannerSpecialComponent,
    FeatureProductListComponent,
    AddFeatureProductComponent,
    BannerDialogComponent,
    AddSliderComponent,
    DialogFeatureComponent,
    SliderDialogComponent,
    SpecialOfferListComponent,
    AddSpecialOfferComponent,
    DialogSpecialOfferComponent,
    PageListComponent,
    AddPageListComponent,
    DialogSelectComponent,
    CmsLandingPageComponent,

  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    ContentManagementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CKEditorModule,
    CarouselModule
  ]
})
export class ContentManagementModule { }
