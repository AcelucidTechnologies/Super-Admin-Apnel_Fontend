import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { CouponData, couponAllData, rewardsRedemptionData } from '../DummyData/marketing';
import { COUPANCODEDATA, } from '../_models/marketingModule';


@Injectable({
    providedIn: 'root'
})
export class MarketingService {
    editListCoupon(payload: any, id: any) {
      throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient) {

    }
    getCouponList() {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons`;
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        return of(CouponData)
    }

    getActiveCouponList() {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons`;
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        let ActiveCouponList = CouponData.filter(item => item.status === true)
        return of(ActiveCouponList)
    }

    getInActiveCouponList() {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons`;
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        let InActiveCouponList = CouponData.filter(item => item.status === false)
        return of(InActiveCouponList)
    }
    addCouponCode(Data: any) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons`;
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        CouponData.push(Data)
        return of(Data)
    }
    getCouponCodeById(id) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/couponsById`;
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        let indeofCoupon = CouponData.findIndex(item => item.id === id);
        return of(CouponData[indeofCoupon])
    }
    editCouponCode(CouponCode: any, payload) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons`;
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        let indeofCoupon = CouponData.findIndex(item => item.Code === CouponCode);
        CouponData[indeofCoupon] = payload
        return of(payload)
    }

    getRewardRedemptionList(){
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons`;
        return of(rewardsRedemptionData)
    }

    // Push Notification

    pushNotification(payload: any): Observable<any>  {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/createPushNotification`;
      return this.http.post(endpointUrl, payload, { 'headers': httpOptions });
  }

    metaAnalytics(payload: any): Observable<any>  {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/CreateMetaAnalyticsTracking`;
      return this.http.post(endpointUrl, payload, { 'headers': httpOptions });
  }

  googleAnalytics(payload: any): Observable<any>  {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token);
    const endpointUrl = `${environment.JSON_SERVER}/CreateGoogleAnalyticsTracking`;
    return this.http.post(endpointUrl, payload, { 'headers': httpOptions });
}

    seo(payload: any): Observable<any>  {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/createSeo`;
      return this.http.post(endpointUrl, payload, { 'headers': httpOptions });
  }

    // liveChat
    liveChat(payload: any): Observable<any>  {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/creteLiveChat`;
      return this.http.post(endpointUrl, payload, { 'headers': httpOptions });
  }

            //    ---------------------marketting apis---------------

    getCouponsList(): Observable<COUPANCODEDATA[]> {
        const token = localStorage.getItem('token') || '';
        const email = localStorage.getItem('email') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons?username=${email}`;
        return this.http.get<any[]>(endpointUrl, { 'headers': httpOptions });
    }

    addListCoupon(payload: any): Observable<any[]>  {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/createcoupons`;
        return this.http.post<any>(endpointUrl, payload, { 'headers': httpOptions });
    }


    editListsCoupan(payload, id: number) {
      const token = localStorage.getItem('token') || '';
      const httpOptions = new HttpHeaders().set('x-access-token', token);
      const endpointUrl = `${environment.JSON_SERVER}/updateCoupons?id=${id}`;

      return this.http.put<any>(endpointUrl, payload, { headers: httpOptions });
    }



    deleteCoupan(id: number) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/deleteCoupons?id=${id}`;
        return this.http.delete<any>(endpointUrl, { 'headers': httpOptions });
    }

    getcoupanById(id: number): Observable<any> {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/getCouponDataById?id=${id}`;
        return this.http.get<any>(endpointUrl,{ 'headers': httpOptions });
    }
}
