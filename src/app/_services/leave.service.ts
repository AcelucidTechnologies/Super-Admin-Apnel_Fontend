import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient,private router: Router) { }

  getLeaveProfileById(id: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let httpOptions = new HttpHeaders().set('x-access-token', token)
    const endpointUrl = `${environment.JSON_SERVER}/getLeaveProfileById?id=${id}`;
    return this.http.get<any>(endpointUrl,{ 'headers': httpOptions });
}
getProfileList(): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email')
  let httpOptions = new HttpHeaders().set('x-access-token', token)
 const endpointUrl = `${environment.JSON_SERVER}/getLeaveProfile?username=${email}`;
 return this.http.get<any[]>(endpointUrl ,{ 'headers': httpOptions });

}
addProfile(payload: any): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email') || '';
  let httpOptions = new HttpHeaders().set('x-access-token', token)

  const formData = new FormData();
  formData.append('username', email);
  formData.append('employeeFullName', payload.employeeFullName);
    formData.append('FirstName', payload.FirstName);
    formData.append('lastName', payload.lastName);
    formData.append('email', payload.email);
    formData.append('image', payload.image);
    formData.append('department', payload.department);
    formData.append('designation', payload.designation);
    formData.append('location', payload.location);
    formData.append('role', payload.role);
    formData.append('employmentType', payload.employmentType);
    formData.append('employeeStatus', payload.employeeStatus);
    formData.append('sourceHiring', payload.sourceHiring);
    formData.append('dateOfJoining', payload.dateOfJoining);
    formData.append('currentExp', payload.currentExp);
    formData.append('totalExp', payload.totalExp);

    formData.append('reportingManager', payload.reportingManager);

    formData.append('personalDetails[dateOfBirth]', payload.personalDetails.dateOfBirth);
    formData.append('personalDetails[age]', payload.personalDetails.age);
    formData.append('personalDetails[gender]', payload.personalDetails.gender);
    formData.append('personalDetails[maritalStatus]', payload.personalDetails.maritalStatus);
    formData.append('personalDetails[aboutMe]', payload.personalDetails.aboutMe);
    formData.append('personalDetails[expertise]', payload.personalDetails.expertise);

    formData.append('identityInformation[uan]', payload.identityInformation.uan);
    formData.append('identityInformation[panNumber]', payload.identityInformation.panNumber);
    formData.append('identityInformation[aadharNumber]', payload.identityInformation.aadharNumber);

    formData.append('contactDetails[workingPhoneNumber]', payload.contactDetails.workingPhoneNumber);
    formData.append('contactDetails[personalMobileNumber]', payload.contactDetails.personalMobileNumber);
    formData.append('contactDetails[personalEmailAddress]', payload.contactDetails.personalEmailAddress);
    formData.append('contactDetails[presentAddress][address1]', payload.contactDetails.presentAddress.address1);
    formData.append('contactDetails[presentAddress][address2]', payload.contactDetails.presentAddress.address2);
    formData.append('contactDetails[presentAddress][country]', payload.contactDetails.presentAddress.country);
    formData.append('contactDetails[presentAddress][state]', payload.contactDetails.presentAddress.state);
    formData.append('contactDetails[presentAddress][city]', payload.contactDetails.presentAddress.city);
    formData.append('contactDetails[presentAddress][pincode]', payload.contactDetails.presentAddress.pincode);
    formData.append('contactDetails[permanentAddress][address1]', payload.contactDetails.permanentAddress.address1);
    formData.append('contactDetails[permanentAddress][address2]', payload.contactDetails.permanentAddress.address2);
    formData.append('contactDetails[permanentAddress][country]', payload.contactDetails.permanentAddress.country);
    formData.append('contactDetails[permanentAddress][State]', payload.contactDetails.permanentAddress.state);
    formData.append('contactDetails[permanentAddress][city]', payload.contactDetails.permanentAddress.city);
    formData.append('contactDetails[permanentAddress][pincode]', payload.contactDetails.permanentAddress.pincode);

    formData.append('separationOfDate', payload.separationOfDate);

    formData.append('systemFields[addedTime]', payload.systemFields.addedTime);
    formData.append('systemFields[modifiedBy]', payload.systemFields.modifiedBy);
    formData.append('systemFields[modifiedTime]', payload.systemFields.modifiedTime);
    formData.append('systemFields[onBoardingStatus]', payload.systemFields.onBoardingStatus);
    formData.append('systemFields[addedBy]', payload.systemFields.addedBy);

    // formData.append('workExperience[companyName]', payload.workExperience.companyName);
    // formData.append('workExperience[jobTitle]', payload.workExperience.jobTitle);
    // formData.append('workExperience[toDate]', payload.workExperience.toDate);
    // formData.append('workExperience[jobDescription]', payload.workExperience.jobDescription);
    // formData.append('workExperience[releventExp]', payload.workExperience.releventExp);


    // formData.append('educationDetails[instituteName]', payload.educationDetails.instituteName);
    // formData.append('educationDetails[degree]', payload.educationDetails.degree);
    // formData.append('educationDetails[specialization]', payload.educationDetails.specialization);
    // formData.append('educationDetails[toDate]', payload.educationDetails.toDate);
    // formData.append('educationDetails[dateOfCompletion]', payload.educationDetails.dateOfCompletion);




    console.log("add profile" + formData)
    const endpointUrl = `${environment.JSON_SERVER}/createLeaveProfile`;
  return this.http.post<any>(endpointUrl, formData,{ 'headers': httpOptions });

}

editProfile(payload: any, id: number) {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email') || '';
  let httpOptions = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/updateLeaveProfile?id=${id}`;
  const formData = new FormData();
  formData.append('username', email);
  formData.append('employeeFullName', payload.employeeFullName);
    formData.append('FirstName', payload.FirstName);
    formData.append('lastName', payload.lastName);
    formData.append('email', payload.email);
    formData.append('image', payload.image);
    formData.append('department', payload.department);
    formData.append('designation', payload.designation);
    formData.append('location', payload.location);
    formData.append('role', payload.role);
    formData.append('employmentType', payload.employmentType);
    formData.append('employeeStatus', payload.employeeStatus);
    formData.append('sourceHiring', payload.sourceHiring);
    formData.append('dateOfJoining', payload.dateOfJoining);
    formData.append('currentExp', payload.currentExp);
    formData.append('totalExp', payload.totalExp);

    formData.append('reportingManager', payload.reportingManager);

    formData.append('personalDetails[dateOfBirth]', payload.personalDetails.dateOfBirth);
    formData.append('personalDetails[age]', payload.personalDetails.age);
    formData.append('personalDetails[gender]', payload.personalDetails.gender);
    formData.append('personalDetails[maritalStatus]', payload.personalDetails.maritalStatus);
    formData.append('personalDetails[aboutMe]', payload.personalDetails.aboutMe);
    formData.append('personalDetails[expertise]', payload.personalDetails.expertise);

    formData.append('identityInformation[uan]', payload.identityInformation.uan);
    formData.append('identityInformation[panNumber]', payload.identityInformation.panNumber);
    formData.append('identityInformation[aadharNumber]', payload.identityInformation.aadharNumber);

    formData.append('contactDetails[workingPhoneNumber]', payload.contactDetails.workingPhoneNumber);
    formData.append('contactDetails[personalMobileNumber]', payload.contactDetails.personalMobileNumber);
    formData.append('contactDetails[personalEmailAddress]', payload.contactDetails.personalEmailAddress);
    formData.append('contactDetails[presentAddress][address1]', payload.contactDetails.presentAddress.address1);
    formData.append('contactDetails[presentAddress][address2]', payload.contactDetails.presentAddress.address2);
    formData.append('contactDetails[presentAddress][country]', payload.contactDetails.presentAddress.country);
    formData.append('contactDetails[presentAddress][state]', payload.contactDetails.presentAddress.state);
    formData.append('contactDetails[presentAddress][city]', payload.contactDetails.presentAddress.city);
    formData.append('contactDetails[presentAddress][pincode]', payload.contactDetails.presentAddress.pincode);
    formData.append('contactDetails[permanentAddress][address1]', payload.contactDetails.permanentAddress.address1);
    formData.append('contactDetails[permanentAddress][address2]', payload.contactDetails.permanentAddress.address2);
    formData.append('contactDetails[permanentAddress][country]', payload.contactDetails.permanentAddress.country);
    formData.append('contactDetails[permanentAddress][State]', payload.contactDetails.permanentAddress.state);
    formData.append('contactDetails[permanentAddress][city]', payload.contactDetails.permanentAddress.city);
    formData.append('contactDetails[permanentAddress][pincode]', payload.contactDetails.permanentAddress.pincode);

    formData.append('separationOfDate', payload.separationOfDate);

    formData.append('systemFields[addedTime]', payload.systemFields.addedTime);
    formData.append('systemFields[modifiedBy]', payload.systemFields.modifiedBy);
    formData.append('systemFields[modifiedTime]', payload.systemFields.modifiedTime);
    formData.append('systemFields[onBoardingStatus]', payload.systemFields.onBoardingStatus);
    formData.append('systemFields[addedBy]', payload.systemFields.addedBy);

     formData.append('workExperience[companyName]', payload.workExperience.companyName);
    formData.append('workExperience[jobTitle]', payload.workExperience.jobTitle);
    formData.append('workExperience[toDate]', payload.workExperience.toDate);
    formData.append('workExperience[jobDescription]', payload.workExperience.jobDescription);
    formData.append('workExperience[releventExp]', payload.workExperience.releventExp);

    formData.append('educationDetails[instituteName]', payload.educationDetails.instituteName);
    formData.append('educationDetails[degree]', payload.educationDetails.degree);
    formData.append('educationDetails[specialization]', payload.educationDetails.specialization);
    formData.append('educationDetails[toDate]', payload.educationDetails.toDate);
    formData.append('educationDetails[dateOfCompletion]', payload.educationDetails.dateOfCompletion);

  return this.http.put<any>(endpointUrl,formData, { 'headers': httpOptions });
}


getdepartmentList(): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email')
  let httpOptions = new HttpHeaders().set('x-access-token', token)
 const endpointUrl = `${environment.JSON_SERVER}/getDepartment?username=${email}`;
 return this.http.get<any[]>(endpointUrl ,{ 'headers': httpOptions });
}
createdepartment(payload:any): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
        const email = localStorage.getItem('email') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
          const endpointUrl = `${environment.JSON_SERVER}/createDepartment`;
        return this.http.post<any>(endpointUrl, payload,{ 'headers': httpOptions });
}
getdesignationList(): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email')
  let httpOptions = new HttpHeaders().set('x-access-token', token)
 const endpointUrl = `${environment.JSON_SERVER}/getDesignation?username=${email}`;
 return this.http.get<any[]>(endpointUrl ,{ 'headers': httpOptions });
}
createdesignation(payload:any): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
        const email = localStorage.getItem('email') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
          const endpointUrl = `${environment.JSON_SERVER}/createDesignation`;
        return this.http.post<any>(endpointUrl, payload,{ 'headers': httpOptions });
}
getSourceHiringList(): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email')
  let httpOptions = new HttpHeaders().set('x-access-token', token)
 const endpointUrl = `${environment.JSON_SERVER}/getsourceHiring?username=${email}`;
 return this.http.get<any[]>(endpointUrl ,{ 'headers': httpOptions });
}
createSourceHiring(payload:any): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
        const email = localStorage.getItem('email') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
          const endpointUrl = `${environment.JSON_SERVER}/createSourceHiring`;
        return this.http.post<any>(endpointUrl, payload,{ 'headers': httpOptions });
}
getReportList(): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email')
  let httpOptions = new HttpHeaders().set('x-access-token', token)
 const endpointUrl = `${environment.JSON_SERVER}/getReporting?username=${email}`;
 return this.http.get<any[]>(endpointUrl ,{ 'headers': httpOptions });
}
createReport(payload:any): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
        const email = localStorage.getItem('email') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
          const endpointUrl = `${environment.JSON_SERVER}/createReporting`;
        return this.http.post<any>(endpointUrl, payload,{ 'headers': httpOptions });
}
getLocationList(): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
  const email = localStorage.getItem('email')
  let httpOptions = new HttpHeaders().set('x-access-token', token)
 const endpointUrl = `${environment.JSON_SERVER}/getLocation?username=${email}`;
 return this.http.get<any[]>(endpointUrl ,{ 'headers': httpOptions });
}
createLocation(payload:any): Observable<any[]> {
  const token = localStorage.getItem('token') || '';
        const email = localStorage.getItem('email') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
          const endpointUrl = `${environment.JSON_SERVER}/createLocation`;
        return this.http.post<any>(endpointUrl, payload,{ 'headers': httpOptions });
}
deleteProfile(id: string) {
  const token = localStorage.getItem('token') || '';
  let httpOptions = new HttpHeaders().set('x-access-token', token)
  const endpointUrl = `${environment.JSON_SERVER}/deleteLeaveProfile?id=${id}`;
  return this.http.delete<any>(endpointUrl, { 'headers': httpOptions });
}
}
