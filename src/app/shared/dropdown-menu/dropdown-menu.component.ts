import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { LeaveService } from 'src/app/_services/leave.service';


@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  animations: [
    trigger('menu', [
      state('close', style({
        visibility: 'hidden',
        opacity: 0,
        transform: 'translateY(-15px)'
      })),
      state('open', style({
        visibility: 'visible',
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('close => open', [
        animate('100ms')
      ]),
      transition('open => close', [
        animate('50ms')
      ])
    ])
  ]
})
export class DropdownMenuComponent implements OnInit {
  notificationDropdownVisible = false;
role: any;
leaveTrackerList: any[];
notificationCount: number;
  profile: any;
  profileAvatarUrl: any;
  menuState: string = '';
  myTripsUrl: string = '';
  settingsClass: string = '';
  UserData= localStorage.getItem("UserData")
  image:string="https://source.unsplash.com/c_GmwfHBDzk/200x200";
  user:string=''
  @ViewChild('dropdown', { static: false }) dropdown!: ElementRef;
  @ViewChild('submenu', { static: false }) submenu!: ElementRef;
  adminDetails: any;

  constructor(
    private router: Router,
    private adminService:AdminService,
    private LeaveService: LeaveService,
  ) {
    this.user = localStorage.getItem('UserData')
    this.role = localStorage.getItem('role')
    console.log("asdfghjk",this.user)
   }

  ngOnInit() {
    this.getImage()
    this.settingsClass = '';
    this.menuState = 'close';
    this.getTableforLeaves()
  }

  toggleMenu() {
    if (this.menuState === 'open') {
      this.menuState = 'close';
    } else {
      this.menuState = 'open';
    }
  }

  @HostListener('window:click', ['$event']) onClick($event: MouseEvent) {
    if ((this.dropdown && this.dropdown.nativeElement.contains($event.target) === false)|| this.submenu.nativeElement.contains($event.target)) {
      this.menuState = 'close';
    }
  }


  onLogout(){
    window.localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
  getImage() {
    this.adminService.getAdminDetails(this.UserData).subscribe((res) => {
      if (res[0].image) {
        console.log("datalocal",this.UserData)
        this.image = res[0].image
        console.log(this.image)
      }
    })
  }
  // getTableforLeaves() {
  //   this.LeaveService.getLeaveTrackerList().subscribe((res) => {
  //     this.leaveTrackerList =res
  //     this.notificationCount = this.leaveTrackerList.length;
  //   console.log(this.notificationCount);
  //   });
  // }
  getTableforLeaves() {
    this.LeaveService.getLeaveTrackerList().subscribe((res) => {
      const previousNotificationCount = this.notificationCount;
      this.leaveTrackerList = res;
      this.notificationCount = this.leaveTrackerList.length;

      if (this.notificationCount > previousNotificationCount) {
        const newNotificationCount = this.notificationCount - previousNotificationCount;
        this.notificationCount += newNotificationCount; // Corrected line
      } else {
        this.notificationCount = 0;
      }

      console.log("this.notificationCount" + this.notificationCount);
    });
  }


  toggleNotificationDropdown() {
    this.notificationDropdownVisible = !this.notificationDropdownVisible;
    this.notificationCount = 0;
  }

}
