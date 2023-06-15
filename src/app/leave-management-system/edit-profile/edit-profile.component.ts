import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogDepartmentComponent } from '../dialog-department/dialog-department.component';
import { CmsService } from '../../_services/cms.service';
import { DialogDesignationComponent } from '../dialog-designation/dialog-designation.component';
import { DialogLocationComponent } from '../dialog-location/dialog-location.component';
import { DialogSourceHiringComponent } from '../dialog-source-hiring/dialog-source-hiring.component';
import { DialogReportingManagerComponent } from '../dialog-reporting-manager/dialog-reporting-manager.component';
import { MatDialog } from '@angular/material/dialog';
import { LeaveService } from 'src/app/_services/leave.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { DxiItemModule } from 'devextreme-angular/ui/nested';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  workExpPayload: any[] = [];
  eduExpPayload: any[] = [];
  fileHolder: File | null;
  profileList: any[] = [];
  selectedFileName: string;
  prevImageName: string;
  imageChangedEvent: any = '';
  public imageName: string;
  reportManagerdrop: any;
  imageData: any = null;
  Image: any;
  // Image: any =
  //   'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADp0lEQVR4nO2bSWhUQRCGvyhuiaKCREER94MeAipiEPHmJWrUix4URFFxS4xxuQQdF9zXk4wSQURvbrgvuIEXT17F6MntIEb04JK4FdQLZfscM+Msb3reD8U8eqr7vfq7q7uq+z2IESNGjBgxLCqAWmAdsMkTaQBmAeWkQBmwAXgP/PBUWoFGtfU3dAHOROAB8yWnXRI2OAotQBLY7Ykk1SZro7h4h8/bYX8c6IF/EJuaHXcoRyeHoPCpp8YHENueGXtnSOF6U3AU/5F03SBhCuTad/xhbyImgIxHwEBgvg6ldXpdSQmMgCrgCvAtZI2Vssuq4yUBy4CvnQg22oB6PCNghWPkF+AasF/lupZZneV4QkCV0/N3gWEhesOBew5J4/CAgEtGTwzsnkJX/rtv9M9S5AQMANpNj0ov/wsjzYiR+aAfRUzAXKNzNY2bXTf1JOQuWgLqjc7ONG62x9RbRRETUGd0dmVIwBo8cYFradzshqk3B48mwRGduNEoMwm2axtFvQxeSXMZfGD0pS7FTsB4Xc4C3fvayy5GOca3aV0vQuEGJ8yVIX4TOAAcBG6F5AlSx6tkaKOZD1JJu2625hp909zGy0o6XO2Euq7IHDGZ7EBcah7QBJwCHure5du/pOOfgRfAYx2RJ7XuPHXFfdkgIICExEu0nsjivyRI6UBC5kV6TvGyEyPtfyQRlS2xLhprXNAeTNeQD8CnDOptKTQB4rtLgScpHvKN5h87gAXANGA00CekPTnt6Q8MBiZo/rFaD0cuAs+B79qu/E4vJAG1zh69XTbv6BnemBzctzcwCRgbFOSbgKHao67hr4Ct2nt5RSKPBNTo7G0Nf61bbd0oEBJ5IEB8c5vxv2Co79AhWVAkckyAGH/E6XXx/SlEBIkcEtBVz+Kt8ef1RJpSIOCQY/wRJYVSIGClY7ysxVGAjL7DKhW5IqDaSZ2bw97LKRDq3G26RJYJ6K3JStDm7YgN+5wfjyedMHYQ0UJOCZgYFmuXEgEPTFuy/FFKBMw27XwsRExfaAIemXY2E13khICpzuaE5OQlRcA508Zeoo0/7G00BbKEpYtKs0ssv0MosvcEZ5qClgzeFLUhr5wRRBk9dVsseN4a9H3ZVids7ZHh0reQaBt/wjzrO6BX8GdjSL6e7MSHCE3O3vz2CHwcESbHnJ4XWWvZKQvJ232WU2HJWZlOCtYdfJN32vMpM9NynRgbIvChQ7akQV+N7/D5GDFixIjxi4GfxUF9ZJ3ajNUAAAAASUVORK5CYII';
  rows: FormGroup[] = [];
  workExperience: FormGroup[] = [];
  educationDetails: FormGroup[] = [];
  serialNumberJob = 1;
  serialNumberWork = 1;
  payload: any;
  page: any;
  pageTitleData: any;
  pageLinks: any;
  isChecked: boolean;
  check: boolean;
  laevebyid: any;
  id: any;
  imagehide: false;
  editMode: boolean = false;
  imageShow: true;
  title: any;
  departmentdrop: any;
  designationdrop: any;
  soruceHiringdrop: any;
  reportManager: any;
  locationList: any;
  // id:string = '64805765fb6510393c2e8373';

  profileForm: FormGroup;

  // genderOptions: string[]=['Male', 'Female']
  roleOptions: string[] = ['Employee', 'Admin', 'user'];
  maritalOptions: string[] = [
    'Single',
    'Married',
    'Divorced',
    'Separated',
    'Widowed',
  ];
  statusOptions: string[] = ['Active', 'InActive'];
  employmentStatus: string[] = ['Active', 'InActive'];
  selectedImage: string;
  // employmentType: string[] = ['Full Time', 'Part Time', 'Contract', 'Internship'];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private leaveservice: LeaveService,
    private CmsService: CmsService,
    private toastr: ToastrMsgService,
    private route: Router,
    private activateRoute: ActivatedRoute,

    private ngxLoader: NgxUiLoaderService
  ) {
    this.fileHolder = null;
    this.isChecked = false;

    this.profileForm = this.fb.group({
      employeeId: [''],
      employeeFullName: [''],
      FirstName: [''],
      lastName: [''],
      email: [''],
      image: [''],
      department: [''],
      designation: [''],
      role: [''],
      employmentType: [''],
      employeeStatus: [''],
      sourceHiring: [''],
      dateOfJoining: [''],
      currentExp: [''],
      totalExp: [''],
      reportingManager: [''],
      separationOfDate: [''],
      location: [''],
      educationDetails: this.fb.array([]),
      workExperience: this.fb.array([]),

      contactDetails: this.fb.group({
        presentAddress: this.fb.group({
          address1: [''],
          address2: [''],
          country: [''],
          state: [''],
          city: [''],
          pincode: [''],
        }),
        permanentAddress: this.fb.group({
          address1: [''],
          address2: [''],
          country: [''],
          state: [''],
          city: [''],
          pincode: [''],
        }),
        workingPhoneNumber: [''],
        personalMobileNumber: [''],
        personalEmailAddress: [''],
        sameAsLocal: [''],
      }),
      systemFields: this.fb.group({
        addedBy: [''],
        modifiedBy: [''],
        addedTime: [''],
        modifiedTime: [''],
        onBoardingStatus: [''],
      }),
      identityInformation: this.fb.group({
        uan: [''],
        panNumber: [''],
        aadharNumber: [''],
      }),
      personalDetails: this.fb.group({
        dateOfBirth: [''],
        expertise: [''],
        age: [''],
        gender: [''],
        maritalStatus: [''],
        aboutMe: [''],
      }),
    });

    this.educationDetails = (
      this.profileForm.get('educationDetails') as FormArray
    ).controls as FormGroup[];
    this.workExperience = (this.profileForm.get('workExperience') as FormArray)
      .controls as FormGroup[];
    // this.addNewRow();
    // this.addNewWorkRow();
    console.log(this.educationDetails);
  }

  createEducationRow(): FormGroup {
    console.log('createEducationRow() called');
    return this.fb.group({
      sno: [this.serialNumberJob++],
      instituteName: [''],
      degree: [''],
      specialization: [''],
      toDate: [''],
      // _id: [''],
      editMode: [true],
    });
  }

  createworkRow(): FormGroup {
    return this.fb.group({
      sno: [this.serialNumberWork++],
      username: [''],
      companyName: [''],
      jobTitle: [''],
      fromDate: [''],
      toDate: [''],
      jobDescription: [''],
      releventExp: [''],
      editMode: [true],
    });
  }

  addNewRow() {
    console.log('addNewRow() called');
    const newEducationRow = this.createEducationRow();
    // (this.profileForm.get('educationDetails') as FormArray).push(newRow);
    this.educationDetails.push(newEducationRow);
  }

  addNewWorkRow() {
    const newWorkRow = this.createworkRow();
    // (this.profileForm.get('workExperience') as FormArray).push(newRow);
    this.workExperience.push(newWorkRow);
  }

  toggleEditMode(row: FormGroup) {
    row.get('editMode').setValue(!row.get('editMode').value);
  }

  deleteRow(rowIndex: number) {
    (this.profileForm.get('educationDetails') as FormArray).removeAt(rowIndex);
  }

  deleteWorkRow(rowIndex: number) {
    (this.profileForm.get('workExperience') as FormArray).removeAt(rowIndex);
  }

  getAllProfile() {
    this.leaveservice.getProfileList().subscribe((res) => {
      this.profileList = res;
      console.log('response 24==>', res);
      this.ngxLoader.stop();
    });
  }

  checkValue(control: AbstractControl): void {
    const sameAsLocalControl = control as FormControl;
    const checked = sameAsLocalControl.value;
    this.isChecked = checked;

    if (checked === true) {
      console.log('Before patchValue');
      const localAddress = this.profileForm.get(
        'contactDetails.presentAddress'
      ).value;

      console.log('localAddress:', localAddress);

      this.profileForm.patchValue({
        contactDetails: {
          permanentAddress: {
            address1: localAddress.address1,
            address2: localAddress.address2,
            country: localAddress.country,
            state: localAddress.state,
            city: localAddress.city,
            pincode: localAddress.pincode,
          },
        },
      });

      console.log('After patchValue');
      console.log('isChecked:', this.isChecked);
      console.log('sameAsLocalControl:', sameAsLocalControl);
      console.log(
        'Updated permanentAddress:',
        this.profileForm.get('contactDetails.permanentAddress').value
      );
    } else {
      this.profileForm.patchValue({
        contactDetails: {
          permanentAddress: {
            address1: '',
            address2: '',
            country: '',
            state: '',
            city: '',
            pincode: '',
          },
        },
      });

      console.log('After patchValue');
      console.log('isChecked:', this.isChecked);
      console.log('sameAsLocalControl:', sameAsLocalControl);
      console.log(
        'Updated permanentAddress:',
        this.profileForm.get('contactDetails.permanentAddress').value
      );
    }
  }
  designationControl: FormControl = new FormControl();
  ngOnInit() {
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getDepartment();
    this.getLeaveById();
    this.getDesignation();
    this.getSourceHiring();
    this.getReportManager();
    this.getLocation();
    // this.editUserProfile();
    this.designationControl.valueChanges.subscribe((value) => {
      // Perform any desired action when the value changes
      console.log('Selected Designation:', value);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDepartmentComponent);
  }
  openDialogDesignation() {
    const dialogRef = this.dialog.open(DialogDesignationComponent);
  }
  openDialogLocation() {
    const dialogRef = this.dialog.open(DialogLocationComponent);
  }
  openDialogSourceHiring() {
    const dialogRef = this.dialog.open(DialogSourceHiringComponent);
  }
  openDialogReportingmanager() {
    const dialogRef = this.dialog.open(DialogReportingManagerComponent);
  }

  getDepartment() {
    this.leaveservice.getdepartmentList().subscribe((res) => {
      this.departmentdrop = res;
    });
  }
  getDesignation() {
    this.leaveservice.getdesignationList().subscribe((res) => {
      this.designationdrop = res;
    });
  }
  getSourceHiring() {
    this.leaveservice.getSourceHiringList().subscribe((res) => {
      this.soruceHiringdrop = res;
    });
  }
  getReportManager() {
    this.leaveservice.getReportList().subscribe((res) => {
      this.reportManagerdrop = res;
    });
  }
  getLocation() {
    this.leaveservice.getLocationList().subscribe((res) => {
      this.locationList = res;
      console.log('location values dropdown' + this.locationList);
    });
  }

  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    this.imageData = event.target.files[0];
    this.Image = event.target.files[0];
  }

  getLeaveById() {
    this.leaveservice.getLeaveProfileById(this.id).subscribe((res) => {
      this.laevebyid = res;
      console.log('response leavybu id', res.workExperience.companyName);
      if (res.image) {
        this.Image = res.image;
        this.prevImageName = this.Image.toString().split('.com/profile/')[1];
      }

      console.log('34567890', this.prevImageName);
      const dateOfJoining = this.convertDateFormat(res.dateOfJoining);
      const separationOfDate = this.convertDateFormat(res.separationOfDate);
      const addedTime = this.convertDateFormat(res.systemFields.addedTime);
      const modifiedTime = this.convertDateFormat(
        res.systemFields.modifiedTime
      );

      this.profileForm.patchValue({
        FirstName: res.FirstName,
        lastName: res.lastName,
        employeeFullName: res.employeeFullName,
        employeeId: res.employeeId,
        email: res.email,

        // image:this.prevImageName,
        department: res.department,
        designation: res.designation,
        role: res.role,
        employmentType: res.employmentType,
        employeeStatus: res.employeeStatus,
        sourceHiring: res.sourceHiring,
        dateOfJoining: dateOfJoining,
        currentExp: res.currentExp,
        totalExp: res.totalExp,
        reportingManager: res.reportingManager,
        personalDetails: {
          dateOfBirth: this.convertDateFormat(res.personalDetails.dateOfBirth),
          expertise: res.personalDetails.expertise,
          age: res.personalDetails.age,
          gender: res.personalDetails.gender,
          maritalStatus: res.personalDetails.maritalStatus,
          aboutMe: res.personalDetails.aboutMe,
        },

        contactDetails: {
          presentAddress: {
            address1: res.contactDetails.presentAddress.address1,
            address2: res.contactDetails.presentAddress.address2,
            country: res.contactDetails.presentAddress.country,
            state: res.contactDetails.presentAddress.state,
            city: res.contactDetails.presentAddress.city,
            pincode: res.contactDetails.presentAddress.pincode,
          },
          permanentAddress: {
            address1: res.contactDetails.permanentAddress.address1,
            address2: res.contactDetails.permanentAddress.address2,
            country: res.contactDetails.permanentAddress.country,
            state: res.contactDetails.permanentAddress.state,
            city: res.contactDetails.permanentAddress.city,
            pincode: res.contactDetails.permanentAddress.pincode,
          },
          workingPhoneNumber: res.contactDetails.workingPhoneNumber,
          personalMobileNumber: res.contactDetails.personalMobileNumber,
          personalEmailAddress: res.contactDetails.personalEmailAddress,
        },
        separationOfDate: separationOfDate,
        systemFields: {
          addedBy: res.systemFields.addedBy,
          modifiedBy: res.systemFields.modifiedBy,
          addedTime: this.convertDateFormat(res.systemFields.addedTime),
          modifiedTime: this.convertDateFormat(res.systemFields.modifiedTime),
          onBoardingStatus: res.systemFields.onBoardingStatus,
        },
        identityInformation: {
          uan: res?.identityInformation?.uan
            ? res?.identityInformation?.uan
            : '',
          panNumber: res?.identityInformation?.panNumber
            ? res?.identityInformation?.panNumber
            : '',
          aadharNumber: res?.identityInformation?.aadharNumber
            ? res?.identityInformation?.aadharNumber
            : '',
        },

        // workExperience: res.workExperience.map((item: any) => this.fb.group(item))
        //
      });
      console.log('Patch value:', this.profileForm.value);

      res.workExperience.map((item) => {
        this.workExperience.push(
          this.fb.group({
            sno: [this.serialNumberWork++],
            companyName: item.companyName,
            jobTitle: item.jobTitle,
            toDate: this.convertDateFormat(item.toDate),
            fromDate: this.convertDateFormat(item.fromDate),
            jobDescription: item.jobDescription,
            releventExp: item.releventExp,
            editMode: [true],
          })
        );
      });

      res.educationDetails.map((item) => {
        this.educationDetails.push(
          this.fb.group({
            sno: [this.serialNumberWork++],
            instituteName: item.instituteName,
            degree: item.degree,
            specialization: item.specialization,
            toDate: this.convertDateFormat(item.toDate),

            editMode: [true],
          })
        );
      });
    });
  }
  // convertDateFormat(date: string): string {
  //   const parts = date.split('/');
  //   const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  //   return formattedDate;
  // }

  convertDateFormat(apiDate: string): string {
    if (!apiDate) {
      return ''; // or return a default value if desired
    }

    const date = new Date(apiDate);
    const year = date.getUTCFullYear();
    const month = this.formatNumber(date.getUTCMonth() + 1);
    const day = this.formatNumber(date.getUTCDate());
    return `${year}-${month}-${day}`;
    // return `${month}/${date}/${year}`;
  }

  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  editUserProfile() {
    this.leaveservice.editProfile(this.payload, this.id).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess(
          'user profile edit successfully',
          'profile edit'
        );
        this.ngxLoader.stop();
        this.route.navigate(['/leaveMgmt/profile-list']);
      }
      (error: any) => {
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
        this.ngxLoader.stop();
        this.route.navigate(['/']);
      };
    });
  }

  submit() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      console.log('submit form value ===>' + formValue);
      this.ngxLoader.start();
      this.payload = {
        username: localStorage.getItem('email'),
        employeeId: this.profileForm.controls['employeeId'].value,
        image: this.Image,
        employeeFullName: this.profileForm.controls['employeeFullName'].value,
        FirstName: this.profileForm.controls['FirstName'].value,
        lastName: this.profileForm.controls['lastName'].value,
        department: this.profileForm.controls['department'].value,
        designation: this.profileForm.controls['designation'].value,
        email: this.profileForm.controls['email'].value,
        role: this.profileForm.controls['role'].value,
        location: this.profileForm.controls['location'].value,
        employmentType: this.profileForm.controls['employmentType'].value,
        employeeStatus: this.profileForm.controls['employeeStatus'].value,
        sourceHiring: this.profileForm.controls['sourceHiring'].value,
        dateOfJoining: this.profileForm.controls['dateOfJoining'].value,
        currentExp: this.profileForm.controls['currentExp'].value,
        totalExp: this.profileForm.controls['totalExp'].value,
        reportingManager: this.profileForm.controls['reportingManager'].value,
        personalDetails: {
          dateOfBirth: this.profileForm.get('personalDetails.dateOfBirth')
            .value,
          expertise: this.profileForm.get('personalDetails.expertise').value,
          age: this.profileForm.get('personalDetails.age').value,
          gender: this.profileForm.get('personalDetails.gender').value,
          maritalStatus: this.profileForm.get('personalDetails.maritalStatus')
            .value,
          aboutMe: this.profileForm.get('personalDetails.aboutMe').value,
        },
        identityInformation: {
          uan: this.profileForm.get('identityInformation.uan').value,
          panNumber: this.profileForm.get('identityInformation.panNumber')
            .value,
          aadharNumber: this.profileForm.get('identityInformation.aadharNumber')
            .value,
        },
        contactDetails: {
          presentAddress: {
            address1: this.profileForm.get(
              'contactDetails.presentAddress.address1'
            ).value,
            address2: this.profileForm.get(
              'contactDetails.presentAddress.address2'
            ).value,
            country: this.profileForm.get(
              'contactDetails.presentAddress.country'
            ).value,
            state: this.profileForm.get('contactDetails.presentAddress.state')
              .value,
            city: this.profileForm.get('contactDetails.presentAddress.city')
              .value,
            pincode: this.profileForm.get(
              'contactDetails.presentAddress.pincode'
            ).value,
          },
          permanentAddress: {
            address1: this.profileForm.get(
              'contactDetails.permanentAddress.address1'
            ).value,
            address2: this.profileForm.get(
              'contactDetails.permanentAddress.address2'
            ).value,
            country: this.profileForm.get(
              'contactDetails.permanentAddress.country'
            ).value,
            state: this.profileForm.get('contactDetails.permanentAddress.state')
              .value,
            city: this.profileForm.get('contactDetails.permanentAddress.city')
              .value,
            pincode: this.profileForm.get(
              'contactDetails.permanentAddress.pincode'
            ).value,
          },
          workingPhoneNumber: this.profileForm.get(
            'contactDetails.workingPhoneNumber'
          ).value,
          personalMobileNumber: this.profileForm.get(
            'contactDetails.personalMobileNumber'
          ).value,
          personalEmailAddress: this.profileForm.get(
            'contactDetails.personalEmailAddress'
          ).value,
          sameAsLocal: this.profileForm.get('contactDetails.sameAsLocal').value,
        },
        separationOfDate: this.profileForm.controls['separationOfDate'].value,
        systemFields: {
          addedBy: this.profileForm.get('systemFields.addedBy').value,
          modifiedBy: this.profileForm.get('systemFields.modifiedBy').value,
          addedTime: this.profileForm.get('systemFields.addedTime').value,
          modifiedTime: this.profileForm.get('systemFields.modifiedTime').value,
          onBoardingStatus: this.profileForm.get(
            'systemFields.onBoardingStatus'
          ).value,
        },
        workExperience: this.workExperiencePayload(),
        educationDetails: this.educationExperiencePayload(),

        // educationDetails: this.profileForm.get('educationDetails').value
      };

      this.editUserProfile();

      this.rows = [];
      this.workExperience = [];
      this.serialNumberJob = 1;
      this.serialNumberWork = 1;
      // this.addNewRow();
      // this.addNewWorkRow();
      // this.getAllProfile();
    } else {
      this.markAllFormControlsAsTouched();
    }
  }


  workExperiencePayload() {
    this.workExperience.map((item) => {
      this.workExpPayload.push({
        companyName: item.controls['companyName'].value,
        jobTitle: item.controls['jobTitle'].value,
        toDate: item.controls['toDate'].value,
        fromDate: item.controls['fromDate'].value,
        jobDescription: item.controls['jobDescription'].value,
        releventExp: item.controls['releventExp'].value,
      });
    });
    return this.workExpPayload;
  }

  educationExperiencePayload() {
    this.educationDetails.map((item) => {
      this.eduExpPayload.push({
        instituteName: item.controls['instituteName'].value,
        degree: item.controls['degree'].value,
        specialization: item.controls['specialization'].value,
        toDate: item.controls['toDate'].value,
      });
    });
    return this.eduExpPayload;
  }

  markAllFormControlsAsTouched() {
    const formControls = this.profileForm.controls;
    Object.keys(formControls).forEach((key) => {
      const control = formControls[key];
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllFormControlsAsTouched();
      }
    });
  }
}
