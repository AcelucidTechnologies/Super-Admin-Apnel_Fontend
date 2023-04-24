import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingManagementRoutingModule } from './marketing-management-routing.module';
import { CouponsComponent } from './coupans/coupan-list/coupons/coupons.component';
import {SharedModule} from '../shared/shared.module';
import { AddEditCouponComponent } from './add-edit-coupon/add-edit-coupon.component';
import { ActiveCouponComponent } from './active-coupon/active-coupon.component';
import { InactiveCouponComponent } from './inactive-coupon/inactive-coupon.component';
import { RewardsComponent } from './rewards/rewards.component';
import { CoupanListComponent } from './coupans/coupan-list/coupan-list.component';
import { AddCoupanComponent } from './coupans/add-coupan/add-coupan.component';
import { CoupanDialogComponent } from './coupans/coupan-dialog/coupan-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LiveChatComponent } from './Live-chat/live-chat/live-chat.component';
import { PushNotificationComponent } from './push-notification/push-notification/push-notification.component';
import { SeoComponent } from './seo/seo/seo.component';
import { AnalyticsTrackingComponent } from './analytics-tracking/analytics-tracking/analytics-tracking.component';

@NgModule({
  declarations: [
    CouponsComponent,
    AddEditCouponComponent,
    ActiveCouponComponent,
    InactiveCouponComponent,
    RewardsComponent,
    CoupanListComponent,
    AddCoupanComponent,
    CoupanDialogComponent,
    LiveChatComponent,
    PushNotificationComponent,
    SeoComponent,
    AnalyticsTrackingComponent
  ],
  imports: [
    CommonModule,
    MarketingManagementRoutingModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class MarketingManagementModule { }
