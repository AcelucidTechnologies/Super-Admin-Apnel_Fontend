import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SUBSCRIPTION } from '../_models/subscription';
import { paymentData, subscriptionData } from '../DummyData/subscription';
import { environment } from 'src/environments/environment';
import { PAYMENT } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getSubscriptionList(): Observable<SUBSCRIPTION[]> {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    // const endpointUrl = `${environment.JSON_SERVER}/subscription`;
    // return this.http.get<CATEGORY[]>(endpointUrl, { 'headers': httpOptions });
    return of(subscriptionData)
  }

  addSubscription(subscriptions: any) {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/feature`;
    // return this.http.post<any>(endpointUrl, categoryData, { 'headers': httpOptions });
    subscriptions.id = subscriptionData.length + 1
    subscriptionData.push(subscriptions);
    return of(subscriptions)
  }


  editBooking(bookingsData: SUBSCRIPTION, id: number) {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/subscription/${id}`;
    // return this.http.put<CATEGORY>(endpointUrl, categoryData, { 'headers': httpOptions });
    let featureObj = subscriptionData.findIndex((obj) => obj.id == id);
    subscriptionData[featureObj] = bookingsData
    return of(bookingsData)
  }

  getSubscriptionById(id: number): Observable<SUBSCRIPTION> {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/subscription/${id}`;
    let indexObj = subscriptionData.findIndex((obj) => obj.id == id);
    //return this.http.get<CATEGORY>(endpointUrl,{ 'headers': httpOptions });
    return of(subscriptionData[indexObj])
  }

    deleteSubsription(id: number) {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/subscription/${id}`;
      //return this.http.delete<CATEGORY>(endpointUrl, { 'headers': httpOptions });
      let productObj = subscriptionData.map(item => {
          item.id == id;
          return item;
      })
      subscriptionData.splice(subscriptionData.findIndex((index) => index.id == id),1);
      return of(productObj)

    }

    getPaymentList(): Observable<PAYMENT[]> {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      // const endpointUrl = `${environment.JSON_SERVER}/subscription`;
      // return this.http.get<CATEGORY[]>(endpointUrl, { 'headers': httpOptions });
      return of(paymentData)
    }
    
  }
