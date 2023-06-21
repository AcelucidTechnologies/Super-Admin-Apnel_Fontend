import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { reviewList } from '../DummyData/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http:HttpClient) { }

  getReviewList():Observable<any[]>{
    const token = localStorage.getItem('token') || '';
    const username= localStorage.getItem("email")
    let httpOptions = new HttpHeaders().set('x-access-token',token);
    const endpointUrl = `${environment.JSON_SERVER}/getReviewList?username=${username}`
     return this.http.get<any[]>(endpointUrl,{ 'headers': httpOptions });
}

editReviewList(payload, id: number) {
  const token = localStorage.getItem('token') || '';
  const httpOptions = new HttpHeaders().set('x-access-token', token);
  const endpointUrl = `${environment.JSON_SERVER}/updateReviewList?id=${id}`;

  return this.http.put<any>(endpointUrl, payload, { headers: httpOptions });
}

getReviewDetailById(id: number): Observable<any> {
  const token = localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/getReviewListById?id=${id}`;
  return this.http.get<any>(endpointUrl,{ 'headers': httpOptions });
}
submitReviewDetail(payload:any):Observable<any[]>{
  const token = localStorage.getItem('token') || '';
  let httpOption = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/createReviewList`;
  return this.http.post<any[]>(endpointUrl,payload ,{ 'headers': httpOption });
  // payload.Sno=reviewList.length+1;
  // reviewList.push(payload)
  // return of(reviewList)
}



deleteReviewDetails(id:number):Observable<any[]>{
  const token =localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token',token)
  const endpointUrl = `${environment.JSON_SERVER}/deleteReviewList?id=${id}`
  return this.http.delete<any[]>(endpointUrl,{'headers':httpOptions})
  // let filteredData = reviewList.filter(val=>{
  //   val.id =  name
  // })
  // reviewList.splice(reviewList.indexOf(filteredData[0]),1)
  // return of(reviewList)
  // let filteredreview = reviewList.splice(reviewList.findIndex((index) => index.reviewSubject == name),1);
  //       return of(filteredreview)
}

submitEditDetail(payload:any,serialno:number){
  const token = localStorage.getItem('token') || '';
  let httpOption = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/edit`;
  reviewList.map((res)=>{
    if (res.Sno == serialno) {
      res.reviewSubject = payload.reviewSubject,
      res.rating = payload.rating,
      res.publishingsiteurl = payload.publishingsiteurl,
      res.status = payload.status
    }
  })
  return of(reviewList)
}



getReviewDetail(serialno:number){
  const token = localStorage.getItem('token') || '';
  let httpOption = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/edit`;
  let filtered =reviewList.filter((res)=>{
    return res.Sno == serialno
  })

  console.log(serialno)
  return of(filtered)
}
}
