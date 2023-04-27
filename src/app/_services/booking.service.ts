import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BOOKING, PRODUCTS } from '../_models/booking';
import { bookingData, bookingProduct } from '../DummyData/booking-order';
import { environment } from 'src/environments/environment';

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

  addBokking(bookings: any) {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/feature`;
    // return this.http.post<any>(endpointUrl, categoryData, { 'headers': httpOptions });
    bookings.id = bookingData.length + 1
    bookingData.push(bookings);
    return of(bookings)
  }


  editBooking(bookingsData: BOOKING, id: number) {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/category/${id}`;
    // return this.http.put<CATEGORY>(endpointUrl, categoryData, { 'headers': httpOptions });
    let featureObj = bookingData.findIndex((obj) => obj.id == id);
    bookingData[featureObj] = bookingsData
    return of(bookingsData)
  }

  getBookingById(id: number): Observable<BOOKING> {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/category/${id}`;
    let indexObj = bookingData.findIndex((obj) => obj.id == id);
    //return this.http.get<CATEGORY>(endpointUrl,{ 'headers': httpOptions });
    return of(bookingData[indexObj])
  }

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


  // ---------------------------------------- booking product Api ---------------------------

  getBookingProductList(): Observable<PRODUCTS[]> {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    // const endpointUrl = `${environment.JSON_SERVER}/category`;
    // return this.http.get<CATEGORY[]>(endpointUrl, { 'headers': httpOptions });
    return of(bookingProduct)
  }

  addBokkingProduct(bookings: any) {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/feature`;
    // return this.http.post<any>(endpointUrl, categoryData, { 'headers': httpOptions });
    bookings.id = bookingProduct.length + 1
    bookingProduct.push(bookings);
    return of(bookings)
  }
}


