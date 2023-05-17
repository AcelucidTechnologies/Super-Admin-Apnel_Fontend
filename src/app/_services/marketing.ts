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
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        return of(rewardsRedemptionData)
    }

            //    ---------------------marketting apis---------------


    getCouponsList(): Observable<COUPANCODEDATA[]> {
        const token = localStorage.getItem('token') || '';
        const email = localStorage.getItem('email') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons?username=${email}`;
        return this.http.get<any[]>(endpointUrl, { 'headers': httpOptions });
        // return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        // return of(couponAllData)
    }

    addCoupon(Data: any) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons`;
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        couponAllData.push(Data)
        return of(Data)
    }

    editCoupon(coupanData: COUPANCODEDATA, id: number) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/coupons`;
        //return this.http.get(endpointUrl, { 'headers': httpOptions }).pipe(map(res => res));
        let indeofCoupon = couponAllData.findIndex((obj) => obj.id == id);
        couponAllData[indeofCoupon] = coupanData
        return of(coupanData)
    }

    deleteCoupan(id: number) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/category/${id}`;
        //return this.http.delete<CATEGORY>(endpointUrl, { 'headers': httpOptions });
        let productObj = couponAllData.map(item => {
            item.id == id;
            return item;
        })
        couponAllData.splice(couponAllData.findIndex((index) => index.id == id),1);
        return of(productObj)
    }

    getcoupanById(id: number): Observable<COUPANCODEDATA> {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/slider/${id}`;
        let indexObj = couponAllData.findIndex((obj)=>obj.id==id);
        //return this.http.get<CATEGORY>(endpointUrl,{ 'headers': httpOptions });
        return of(couponAllData[indexObj])
    }
}
