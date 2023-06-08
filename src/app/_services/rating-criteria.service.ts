import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { ratingCriteriaList } from '../DummyData/ratingCriteria';

@Injectable({
  providedIn: 'root'
})
export class RatingCriteriaService {

  constructor(private http:HttpClient) { }

  getCriteriaList():Observable<any[]>{
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
    let httpOptions = new HttpHeaders().set('x-access-token',token);
    const endpointUrl = `${environment.JSON_SERVER}/getRatingCriteria?username=${email}`
    return this.http.get<any[]>(endpointUrl,{ 'headers': httpOptions });

  }

  getCriteriaDetails(id:number):Observable<any>{
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token',token);
    const endpointUrl = `${environment.JSON_SERVER}/getRatingCriteriaById?id=${id}`
    return this.http.get<any[]>(endpointUrl,{ 'headers': httpOptions });

    // console.log(ratingCriteriaList)
    // let filteredValue=ratingCriteriaList.filter(val=>{
    //   return (val.sno == serialno)
    // })
    // return of(filteredValue)
     }

  submitCriteriaDetail(payload:any):Observable<any[]>{
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/createRatingCriteria`;
    return this.http.post<any>(endpointUrl, payload, { 'headers': httpOptions });
    // payload.sno=ratingCriteriaList.length+1;
    // let date = new Date();
    // payload.firstRating = date.toISOString().split('T')[0];
    // payload.rating = '4';
    // ratingCriteriaList.push(payload);
    // console.log(ratingCriteriaList)
    // return of(ratingCriteriaList);
  }

  submitEditedCriteriaDetail(payload:any,id:number)
{
  const token = localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/updateRatingCriteria?id=${id}`;
  return this.http.put<any>(endpointUrl, payload, { headers: httpOptions });
  // ratingCriteriaList.map((res)=>{
  //   if (res.sno == serialno) {
  //     res.ratingCriteria = payload.ratingCriteria,
  //     res.status = payload.status
  //   }
  // })
  // return of(ratingCriteriaList)
}

deleteCriteriaDetails(id:number):Observable<any[]>{
  const token =localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token',token)
  const endpointUrl = `${environment.JSON_SERVER}/deleteRatingCriteria?id=${id}`
  return this.http.delete<any>(endpointUrl,{ 'headers': httpOptions })

}





}
