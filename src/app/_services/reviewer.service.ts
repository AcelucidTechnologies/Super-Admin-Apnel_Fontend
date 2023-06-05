import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { reviewerDetail } from '../DummyData/reviewer';

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {

  constructor(private http:HttpClient) { }

  getReviewerList():Observable<any>{
    const token = localStorage.getItem('token') || '';
    const username= localStorage.getItem("email")
    let httpOptions = new HttpHeaders().set('x-access-token',token);
    const endpointUrl = `${environment.JSON_SERVER}/getReviewerList?username=${username}`
    return this.http.get<any[]>(endpointUrl,{ 'headers': httpOptions });
  }

  getReviewerDetails(serialno:number):Observable<any[]>{
  const token = localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token',token);
  const endpointUrl = `${environment.JSON_SERVER}/reviewDetail`
  // return this.http.get<any[]>(endpointUrl,payload ,{ 'headers': httpOptions });

  console.log(reviewerDetail)
  let filteredValue=reviewerDetail.filter(val=>{
    return (val.sno == serialno)
  })
  return of(filteredValue)
  }

  submitReviewerDetail(payload:any):Observable<any>{
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/createReviewerList`;
    return this.http.post<any[]>(endpointUrl,payload,{ 'headers': httpOptions });
  }

submitEditedDetails(payload:any,serialno:number)
{
  const token = localStorage.getItem('token') || '';
  let httpOption = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/edit`;
  reviewerDetail.map((res)=>{
    if (res.sno == serialno) {
      res.name = payload.name,
      res.email = payload.email,
      res.status = payload.status
    }
  })
  return of(reviewerDetail)
}

deleteReviewerDetails(id:string):Observable<any>{
  const token =localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token',token)
  const endpointUrl = `${environment.JSON_SERVER}/deleteReviewerList?id=${id}`
  return this.http.delete<any>(endpointUrl,{ 'headers': httpOptions })
  // let filteredreviewer = reviewerDetail.splice(reviewerDetail.findIndex((index) => index.name == name),1);
  //       return of(filteredreviewer)
}


}
