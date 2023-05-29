import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { usertypeList } from '../DummyData/usertype';

@Injectable({
  providedIn: 'root'
})
export class UsertypeService {

  constructor(private http:HttpClient) { }

  getUsertypeList():Observable<any[]>{
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
    let httpOptions = new HttpHeaders().set('x-access-token',token);
    const endpointUrl = `${environment.JSON_SERVER}/getUserTypeList?username=${email}`
    return this.http.get<any[]>(endpointUrl,{ 'headers': httpOptions });

  }

  getUsertypeDetails(serialno:number):Observable<any[]>{
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token',token);
    const endpointUrl = `${environment.JSON_SERVER}/reviewDetail`
    // return this.http.get<any[]>(endpointUrl,payload ,{ 'headers': httpOptions });

    console.log(usertypeList)
    let filteredValue=usertypeList.filter(val=>{
      return (val.sno == serialno)
    })
    return of(filteredValue)
    }

  // submitUsertypeDetail(payload:any):Observable<any[]>{
  //   const token = localStorage.getItem('token') || '';
  //   let httpOption = new HttpHeaders().set('x-access-token', token)
  //   const endpointUrl = `${environment.JSON_SERVER}/add`;
  //   payload.sno=usertypeList.length+1;
  //   // let date = new Date();
  //   // payload.firstRating = date.toISOString().split('T')[0];
  //   // payload.rating = '4';
  //   usertypeList.push(payload);
  //   console.log(usertypeList)
  //   return of(usertypeList);
  // }

  createUserTypeList(payload: any): Observable<any[]>  {

      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/createUserTypeList`;
      return this.http.post<any>(endpointUrl, payload, { 'headers': httpOptions });

  }

  editUserType(payload:any,id:any)
{
  const token = localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/updateUserTypeList?id=${id}`;
  return this.http.put<any>(endpointUrl, payload, { headers: httpOptions });
}

deleteUsertypeDetails(id:number):Observable<any[]>{
  const token =localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token',token)
  const endpointUrl = `${environment.JSON_SERVER}/deleteUserTypeList?id=${id}`
  return this.http.delete<any>(endpointUrl, { 'headers': httpOptions });
}


getUserTypeById(id: number): Observable<any>{
  const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/getUserTypeListById?id=${id}`;
        return this.http.get<any>(endpointUrl,{ 'headers': httpOptions });
}
}
