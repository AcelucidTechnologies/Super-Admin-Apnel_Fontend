import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponsComponent } from './coupans/coupan-list/coupons/coupons.component';
import { AuthGuardService as AuthGuard } from '../_services/auth-guard.service';
import { AddEditCouponComponent } from './add-edit-coupon/add-edit-coupon.component';
import { RewardsComponent } from './rewards/rewards.component';
import { AddCoupanComponent } from './coupans/add-coupan/add-coupan.component';
import { CoupanListComponent } from './coupans/coupan-list/coupan-list.component';
import { LiveChatComponent } from './Live-chat/live-chat/live-chat.component';
import { PushNotificationComponent } from './push-notification/push-notification/push-notification.component';
import { SeoComponent } from './seo/seo/seo.component';
import { AnalyticsTrackingComponent } from './analytics-tracking/analytics-tracking/analytics-tracking.component';

const routes: Routes = [
  {
    path: 'coupanList',
    component: CoupanListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addpromo', component: AddEditCouponComponent, canActivate: [AuthGuard]
  },
  {
    path: 'editpromo', component: AddEditCouponComponent, canActivate: [AuthGuard]
  },
  {
    path: 'redemption', component: RewardsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-coupan', component: AddCoupanComponent, canActivate: [AuthGuard]
  },
  {
    path: 'live-chat', component: LiveChatComponent, canActivate: [AuthGuard]
  },
  {
    path: 'push-notification', component: PushNotificationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'seo', component: SeoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'analytics-tracking', component: AnalyticsTrackingComponent, canActivate: [AuthGuard]
  }
];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingManagementRoutingModule { }
