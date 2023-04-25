import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BOOKING } from '../_models/booking';
import { bookingData } from '../DummyData/booking-order';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

      // ----------------FEATURE API----------------

      getBookingOrderList(): Observable<BOOKING[]> {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
       // const endpointUrl = `${environment.JSON_SERVER}/category`;
        // return this.http.get<CATEGORY[]>(endpointUrl, { 'headers': httpOptions });
        return of(bookingData)
    }

    // addFeatureProduct(feature: any) {
    //     const token = localStorage.getItem('token') || '';
    //     let httpOptions = new HttpHeaders().set('x-access-token', token)
    //     const endpointUrl = `${environment.JSON_SERVER}/feature`;
    //     // return this.http.post<any>(endpointUrl, categoryData, { 'headers': httpOptions });
    //     feature.id = featureData.length + 1
    //     featureData.push(feature);
    //     return of(feature)
    // }
    // editFeature(featuresData: FEATURE, id: number) {
    //     const token = localStorage.getItem('token') || '';
    //     let httpOptions = new HttpHeaders().set('x-access-token', token)
    //     const endpointUrl = `${environment.JSON_SERVER}/category/${id}`;
    //     // return this.http.put<CATEGORY>(endpointUrl, categoryData, { 'headers': httpOptions });
    //     let featureObj = featureData.findIndex((obj) => obj.id == id);
    //     featureData[featureObj] = featuresData
    //     return of(featuresData)
    // }

    // getFeatureById(id: number): Observable<FEATURE> {
    //     const token = localStorage.getItem('token') || '';
    //     let httpOptions = new HttpHeaders().set('x-access-token', token)
    //     const endpointUrl = `${environment.JSON_SERVER}/category/${id}`;
    //     let indexObj = featureData.findIndex((obj)=>obj.id==id);
    //     //return this.http.get<CATEGORY>(endpointUrl,{ 'headers': httpOptions });
    //     return of(featureData[indexObj])
    // }

    // deleteProduct(id: number) {
    //     const token = localStorage.getItem('token') || '';
    //     let httpOptions = new HttpHeaders().set('x-access-token', token)
    //     const endpointUrl = `${environment.JSON_SERVER}/category/${id}`;
    //     //return this.http.delete<CATEGORY>(endpointUrl, { 'headers': httpOptions });
    //     let productObj = featureData.map(item => {
    //         item.id == id;
    //         return item;
    //     })
    //     featureData.splice(featureData.findIndex((index) => index.id == id),1);
    //     return of(productObj)
    }


