import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';
import { DialogDepartmentComponent } from '../dialog-department/dialog-department.component';
import { CmsService } from '../../_services/cms.service'
import { DialogDesignationComponent } from '../dialog-designation/dialog-designation.component';
import { DialogLocationComponent } from '../dialog-location/dialog-location.component';
import { DialogSourceHiringComponent } from '../dialog-source-hiring/dialog-source-hiring.component';
import { DialogReportingManagerComponent } from '../dialog-reporting-manager/dialog-reporting-manager.component';
import { LeaveService } from 'src/app/_services/leave.service';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent {
  workExpPayload: any[] = [];
  eduExpPayload: any[] = [];
  // @ViewChild("image")
  // private _image: HTMLImageElement;
  emailControl = new FormControl();
  fileHolder: File | null;
  prevImageName: any;
  imageChangedEvent: any = '';
  public imageName: string;
  profileList: any[]=[];
  emailList:any;
  departmentList:any;
  designationList:any;
  binaryData :any
  imageData: any = null;
  blobImage:any;
  Image:any;
  // Image: any =
  //   'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADp0lEQVR4nO2bSWhUQRCGvyhuiaKCREER94MeAipiEPHmJWrUix4URFFxS4xxuQQdF9zXk4wSQURvbrgvuIEXT17F6MntIEb04JK4FdQLZfscM+Msb3reD8U8eqr7vfq7q7uq+z2IESNGjBgxLCqAWmAdsMkTaQBmAeWkQBmwAXgP/PBUWoFGtfU3dAHOROAB8yWnXRI2OAotQBLY7Ykk1SZro7h4h8/bYX8c6IF/EJuaHXcoRyeHoPCpp8YHENueGXtnSOF6U3AU/5F03SBhCuTad/xhbyImgIxHwEBgvg6ldXpdSQmMgCrgCvAtZI2Vssuq4yUBy4CvnQg22oB6PCNghWPkF+AasF/lupZZneV4QkCV0/N3gWEhesOBew5J4/CAgEtGTwzsnkJX/rtv9M9S5AQMANpNj0ov/wsjzYiR+aAfRUzAXKNzNY2bXTf1JOQuWgLqjc7ONG62x9RbRRETUGd0dmVIwBo8cYFradzshqk3B48mwRGduNEoMwm2axtFvQxeSXMZfGD0pS7FTsB4Xc4C3fvayy5GOca3aV0vQuEGJ8yVIX4TOAAcBG6F5AlSx6tkaKOZD1JJu2625hp909zGy0o6XO2Euq7IHDGZ7EBcah7QBJwCHure5du/pOOfgRfAYx2RJ7XuPHXFfdkgIICExEu0nsjivyRI6UBC5kV6TvGyEyPtfyQRlS2xLhprXNAeTNeQD8CnDOptKTQB4rtLgScpHvKN5h87gAXANGA00CekPTnt6Q8MBiZo/rFaD0cuAs+B79qu/E4vJAG1zh69XTbv6BnemBzctzcwCRgbFOSbgKHao67hr4Ct2nt5RSKPBNTo7G0Nf61bbd0oEBJ5IEB8c5vxv2Co79AhWVAkckyAGH/E6XXx/SlEBIkcEtBVz+Kt8ef1RJpSIOCQY/wRJYVSIGClY7ysxVGAjL7DKhW5IqDaSZ2bw97LKRDq3G26RJYJ6K3JStDm7YgN+5wfjyedMHYQ0UJOCZgYFmuXEgEPTFuy/FFKBMw27XwsRExfaAIemXY2E13khICpzuaE5OQlRcA508Zeoo0/7G00BbKEpYtKs0ssv0MosvcEZ5qClgzeFLUhr5wRRBk9dVsseN4a9H3ZVids7ZHh0reQaBt/wjzrO6BX8GdjSL6e7MSHCE3O3vz2CHwcESbHnJ4XWWvZKQvJ232WU2HJWZlOCtYdfJN32vMpM9NynRgbIvChQ7akQV+N7/D5GDFixIjxi4GfxUF9ZJ3ajNUAAAAASUVORK5CYII';


  rows: FormGroup[] = [];
  workExperience: FormGroup[] = [];
  educationDetails: FormGroup[] = [];
  serialNumberJob = 1;
  serialNumberWork = 1;
  payload: any;
  page:any;
  pageTitleData: any
  pageLinks: any;
  isChecked: boolean;
  // check: boolean;
  laevebyid:any
  id:any
  imagehide: false;
  editMode: boolean = false;
  imageShow: true;
  title:any
  departmentdrop:any;
  designationdrop:any;
  soruceHiring:any;
  reportManager:any;
  locationList:any;
  addProfile:any;
  // id:string = '64805765fb6510393c2e8373';

  profileForm: FormGroup;
  roledrop: { state: string }[];
  employeedrop: { state: string }[];
  employeestatus: { state: string }[];
  genderType: { state: string }[];
  maritalStatusType: { state: string }[];
  onBoardingType: { state: string }[];

  statusOptions: string[] = ['Employee', 'Admin'];
  employmentStatus: string[] = ['Active', 'InActive'];
  employmentType: string[] = ['Full Time', 'Part Time', 'Contract', 'Internship'];
  genderOptions: string[]=['Male', 'Female']
  maritalOptions: string[]=['Single', 'Married', 'Divorced','Separated', 'Widowed']
  workData: any[] = [
    { column1: '', column2: '', column3: '', column4: '', column5: '', column6: '' },
  ];
  presentAddressForm: FormGroup;
  permanentAddressForm: FormGroup;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private route: Router,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    private leaveservice: LeaveService,
    private CmsService: CmsService,
    private activateRoute: ActivatedRoute,

   ){

    this.roledrop = [

      { state: 'Employee' },
      { state: 'Admin' }
    ];
    this.employeedrop = [
      { state: 'Full Time' },
      { state: 'Part Time' },
      { state: 'Contract' },
      { state: 'Internship' }
    ];
    this.employeestatus = [
      { state: 'Active' },
      { state: 'InActive' },
    ];
    this.genderType = [
      { state: 'Male' },
      { state: 'Female' },
    ];
    this.maritalStatusType = [
      { state: 'single' },
      { state: 'Married' },
      { state: 'Divorced' },
      { state: 'Separated' },
      { state: 'Widowed' }
    ];
    this.onBoardingType = [
      { state: 'Active' },
      { state: 'InActive' },
    ];




      this.profileForm = this.fb.group({



        employeeId: [''],
        employeeFullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        FirstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        image:[''],
        department: ['', [Validators.required]],
        designation:['', [Validators.required]],
        role:['', Validators.required],
        employmentType: ['', Validators.required],
        employeeStatus:['', Validators.required],
        sourceHiring:['', [Validators.required]],
        dateOfJoining:['', [Validators.required]],
        currentExp:['', [Validators.required, Validators.pattern(/^\d+$/),this.validateCurrentExp]],
        totalExp:['', [Validators.required]],
        reportingManager:['', [Validators.required]],
        separationOfDate: [''],
        location:['', [Validators.required]],
        educationDetails: this.fb.array([]),
        workExperience: this.fb.array([]),
        contactDetails: this.fb.group({
          presentAddress: this.fb.group({
            address1: ['', [Validators.required]],
            address2: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            pincode: ['', [Validators.required]],
          }),
          permanentAddress: this.fb.group({
            address1: ['', [Validators.required]],
            address2: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            pincode: ['', [Validators.required]],
          }),
          workingPhoneNumber: ['', [Validators.required,  Validators.pattern(/^\d{10}$/)]],
          personalMobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
          personalEmailAddress: ['', [Validators.required, Validators.email]],
          sameAsLocal:[false],
        }),
        personalDetails: this.fb.group({
          dateOfBirth: ['', [Validators.required]],
          expertise: ['', [Validators.required]],
          age: ['', [Validators.required,  Validators.pattern(/^[0-9]+$/),  Validators.min(15), Validators.max(70)]],
          gender: ['', Validators.required],
          maritalStatus: ['', Validators.required],
          aboutMe:['', [Validators.required]]
        }),
        systemFields: this.fb.group({
          addedBy: ['', [Validators.required]],
          modifiedBy: [''],
          addedTime: ['',[Validators.required]],
          modifiedTime: [''],
          onBoardingStatus: ['', [Validators.required]]
        }),
        identityInformation: this.fb.group({
          uan: [''],
          panNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
          aadharNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]]
        }),

      });

      this.profileForm.get('email').valueChanges.subscribe((value) => {
        this.checkEmailValidity(value);
      });



      this.educationDetails = (this.profileForm.get('educationDetails') as FormArray).controls as FormGroup[];
      this.workExperience = (this.profileForm.get('workExperience') as FormArray).controls as FormGroup[];
      this.addNewRow();
      this.addNewWorkRow();
      console.log(this.educationDetails);
      console.log(this.workExperience);
    }



    validateCurrentExp(control: AbstractControl): ValidationErrors | null {
      const currentExp = control.value;
      const totalExp = control?.parent?.get('totalExp')?.value;

      if (currentExp > totalExp) {
        return { greaterThanTotalExp: true };
      }

      return null;
    }

    getAllProfile() {
      this.leaveservice.getProfileList().pipe(
        map((res) => res.map((profile) => profile.email))
      ).subscribe((emailList) => {
        this.emailList = emailList;
        console.log("Email List:", this.emailList);
        this.ngxLoader.stop();
      });
    }
    calculateAge() {
      const dateOfBirth = this.profileForm.get('personalDetails.dateOfBirth').value;
      if (dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        this.profileForm.get('personalDetails.age').patchValue(age);
      }
    }

    getMinimumDate() {
      const leaveType = this.profileForm?.get('dateOfJoining')?.value;
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() );
        return currentDate.toISOString().split('T')[0];

    }


    checkEmailValidity(enteredEmail: string): void {
      if (this.emailList.includes(enteredEmail)) {
        this.toastr.showError('Email already exists!', 'Error');
      }
    }


  createEducationRow(): FormGroup {
    return this.fb.group({
      sno: [this.serialNumberJob++],
      instituteName: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      editMode: [true]
    });
  }

  createworkRow(): FormGroup {
    return this.fb.group({
      sno: [this.serialNumberWork++],
      username:['' ],
      companyName: [''],
      jobTitle: [''],
      fromDate: [''],
      toDate: ['',this.validateToDate.bind(this)],
      jobDescription: [''],
      releventExp: ['', [Validators.min(0), Validators.max(50)]],
      editMode: [true]
    });
  }

  validateToDate(control) {
    const fromDate = this.profileForm?.get('fromDate')?.value;
    const toDate = new Date(control.value);

    if (!fromDate || !toDate || toDate >= new Date(fromDate)) {
      return null;
    }

    return { invalidToDate: true };
  }


  addNewRow() {
    console.log("addNewRow() called");
    const newEducationRow = this.createEducationRow();
    (this.profileForm.get('educationDetails') as FormArray).push(newEducationRow);
  }

  // addNewWorkRow() {
  //   const newRow = this.createworkRow();
  //   (this.profileForm.get('workExperience') as FormArray).push(newRow);
  // }
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

  handleCheckboxChange(event: any) {
    const checkboxValue = event.target.checked;
    console.log('Checkbox value:', checkboxValue);
  }

  checkValue(control: AbstractControl): void {
    const sameAsLocalControl = control as FormControl;
    const checked = sameAsLocalControl.value;
    this.isChecked = checked;

    if (checked === true) {
      console.log('Before patchValue');
      const localAddress = this.profileForm.get('contactDetails.presentAddress').value;

      console.log('localAddress:', localAddress);

      this.profileForm.patchValue({
        contactDetails: {
          permanentAddress: {
            address1: localAddress.address1,
            address2: localAddress.address2,
            country: localAddress.country,
            state: localAddress.state,
            city: localAddress.city,
            pincode: localAddress.pincode
          }
        }
      });

      console.log('After patchValue');
      console.log('isChecked:', this.isChecked);
      console.log('sameAsLocalControl:', sameAsLocalControl);
      console.log('Updated permanentAddress:', this.profileForm.get('contactDetails.permanentAddress').value);
    } else {
      this.profileForm.patchValue({
        contactDetails: {
          permanentAddress: {
            address1: '',
            address2: '',
            country: '',
            state: '',
            city: '',
            pincode: ''
          }
        }
      });

      console.log('After patchValue');
      console.log('isChecked:', this.isChecked);
      console.log('sameAsLocalControl:', sameAsLocalControl);
      console.log('Updated permanentAddress:', this.profileForm.get('contactDetails.permanentAddress').value);
    }
  }

  ngOnInit(){

    this.activateRoute.queryParamMap.subscribe((params) => {
      this.id = params.get('id');

    });
    this.getDepartment();
    this.getDesignation();
    this. getSourceHiring();
    this.getReportManager();
    this.getLocation()
    this.getAllProfile()


  }

  openDialog() {
    this.getDepartment();
    const dialogRef = this.dialog.open(DialogDepartmentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle dialog result
        console.log('Dialog result:', result);
        this.route.navigate(['/leaveMgmt/add-profile']);
      }
    });
  }
  openDialogDesignation(){
    this.getDesignation();
    const dialogRef = this.dialog.open(DialogDesignationComponent);
  }
  openDialogLocation(){
    this.getLocation()
    const dialogRef = this.dialog.open(DialogLocationComponent);
  }
  openDialogSourceHiring(){
    this.getSourceHiring()
    const dialogRef = this.dialog.open(DialogSourceHiringComponent);
  }
  openDialogReportingmanager(){
    this.getReportManager()
    const dialogRef = this.dialog.open(DialogReportingManagerComponent);
  }


  getDepartment(){
    this.leaveservice.getdepartmentList().subscribe((res)=>{
      this.departmentdrop= res
    })
  }
  getDesignation(){
    this.leaveservice.getdesignationList().subscribe((res)=>{
      this.designationdrop= res
    })
  }
  getSourceHiring(){
    this.leaveservice.getSourceHiringList().subscribe((res)=>{
      this.soruceHiring= res
    })
  }
  getReportManager(){
    this.leaveservice.getReportList().subscribe((res)=>{
      this.reportManager= res
    })
  }
  getLocation(){
    this.leaveservice.getLocationList().subscribe((res)=>{
      this.locationList = res
      console.log("location values dropdown" +  this.locationList)
    })
  }




  fileChangeEvent(event) {
    this.imageChangedEvent = event;
    // this.imageData = event.target.files[0];
    this.Image = event.target.files[0];
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // this.imageName = event.target.files[0].name;
    // this.fileHolder = event.target.files[0];
    // reader.onload = (data) => {
    //   this.DefaultImage = data.target.result;

    //   console.log("image 101" + this.fileHolder)
    //   console.log("file event:", this.DefaultImage);

    // };
  }



  submitDetails(recievedValue: any) {
    let newPayload = Object.assign({}, recievedValue);
    this.leaveservice.addProfile(newPayload).subscribe((res) => {
      if (res) {
        console.log("response value" + res)
        this.toastr.showSuccess('profile add successfully', 'profile add');
        this.ngxLoader.stop();
        this.route.navigate(['/leaveMgmt/profile-list']);
      } else {
        console.log("error")
        this.toastr.showError('Somthing wrong Please check', 'Error occured');
      }
      // if (res.length > 0) {
      //   console.log("error");
      //   if (res[0] === "Email Already Exist") {
      //     this.toastr.showError('Email already exists', 'Error occurred');
      //   } else {
      //     this.toastr.showError('Something went wrong. Please check', 'Error occurred');
      //   }
      // } else {
      //   this.toastr.showSuccess('Profile added successfully', 'Profile add');
      //   this.ngxLoader.stop();
      //   this.route.navigate(['/leaveMgmt/profile-list']);
      // }


    });
  }

  submit() {
    if (this.profileForm.valid) {

      const formValue = this.profileForm.value;
      console.log("submit form value ===>"+ JSON.stringify(formValue));
      this.ngxLoader.start();
      this.payload = {
        username: localStorage.getItem('email'),
        employeeId: this.profileForm.controls['employeeId'].value,
        image: this.Image,
        employeeFullName: this.profileForm.controls['employeeFullName'].value,
        FirstName:this.profileForm.controls['FirstName'].value,
        lastName:this.profileForm.controls['lastName'].value,
        department:this.profileForm.controls['department'].value,
        designation:this.profileForm.controls['designation'].value,
        email:this.profileForm.controls['email'].value,
        role:this.profileForm.controls['role'].value,
        location:this.profileForm.controls['location'].value,
        employmentType:this.profileForm.controls['employmentType'].value,
        employeeStatus:this.profileForm.controls['employeeStatus'].value,
        sourceHiring:this.profileForm.controls['sourceHiring'].value,
        dateOfJoining:this.profileForm.controls['dateOfJoining'].value,
        currentExp:this.profileForm.controls['currentExp'].value,
        totalExp:this.profileForm.controls['totalExp'].value,
        reportingManager:this.profileForm.controls['reportingManager'].value,
        personalDetails: {
          dateOfBirth: this.profileForm.get('personalDetails.dateOfBirth').value,
          expertise: this.profileForm.get('personalDetails.expertise').value,
          age: this.profileForm.get('personalDetails.age').value,
          gender: this.profileForm.get('personalDetails.gender').value,
          maritalStatus: this.profileForm.get('personalDetails.maritalStatus').value,
          aboutMe: this.profileForm.get('personalDetails.aboutMe').value
        },
        identityInformation: {
          uan: this.profileForm.get('identityInformation.uan').value,
          panNumber: this.profileForm.get('identityInformation.panNumber').value,
          aadharNumber: this.profileForm.get('identityInformation.aadharNumber').value,
        },
        contactDetails: {
          presentAddress: {
            address1: this.profileForm.get('contactDetails.presentAddress.address1').value,
            address2: this.profileForm.get('contactDetails.presentAddress.address2').value,
            country: this.profileForm.get('contactDetails.presentAddress.country').value,
            state: this.profileForm.get('contactDetails.presentAddress.state').value,
            city: this.profileForm.get('contactDetails.presentAddress.city').value,
            pincode: this.profileForm.get('contactDetails.presentAddress.pincode').value
          },
          permanentAddress: {
            address1: this.profileForm.get('contactDetails.permanentAddress.address1').value,
            address2: this.profileForm.get('contactDetails.permanentAddress.address2').value,
            country: this.profileForm.get('contactDetails.permanentAddress.country').value,
            state: this.profileForm.get('contactDetails.permanentAddress.state').value,
            city: this.profileForm.get('contactDetails.permanentAddress.city').value,
            pincode: this.profileForm.get('contactDetails.permanentAddress.pincode').value
          },
          workingPhoneNumber: this.profileForm.get('contactDetails.workingPhoneNumber').value,
          personalMobileNumber: this.profileForm.get('contactDetails.personalMobileNumber').value,
          personalEmailAddress: this.profileForm.get('contactDetails.personalEmailAddress').value,
          sameAsLocal: this.profileForm.get('contactDetails.sameAsLocal').value
        },
        separationOfDate:this.profileForm.controls['separationOfDate'].value,
        systemFields: {
          addedBy: this.profileForm.get('systemFields.addedBy').value,
          modifiedBy: this.profileForm.get('systemFields.modifiedBy').value,
          addedTime: this.profileForm.get('systemFields.addedTime').value,
          modifiedTime: this.profileForm.get('systemFields.modifiedTime').value,
          onBoardingStatus: this.profileForm.get('systemFields.onBoardingStatus').value,
        },
        workExperience: this.workExperiencePayload(),
        educationDetails: this.educationExperiencePayload() ,

      }


      this.submitDetails(this.payload);
      console.log("submit form value payload 24 ===>"+ this.payload);
      this.ngxLoader.start();
      const table1Values = formValue.educationDetails;
      const table2Values = formValue.workExperience;

      // this.payload = {
      //   educationDetails: formValue.educationDetails,
      //   workExperience: formValue.workExperience,
      // };
      // console.log("payload off submit form value 25===>"+ this.payload);

      this.rows = [];
      this.workExperience = [];
      this.serialNumberJob = 1;
      this.serialNumberWork = 1;
      // this.addNewRow();
      // this.addNewWorkRow();
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
    Object.keys(formControls).forEach(key => {
      const control = formControls[key];
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllFormControlsAsTouched();
      }
    });
  }

}
