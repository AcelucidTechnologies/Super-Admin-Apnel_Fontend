import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { LeaveService } from 'src/app/_services/leave.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  animations: [
    trigger('menu', [
      state(
        'close',
        style({
          visibility: 'hidden',
          opacity: 0,
          transform: 'translateY(-15px)',
        })
      ),
      state(
        'open',
        style({
          visibility: 'visible',
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('close => open', [animate('100ms')]),
      transition('open => close', [animate('50ms')]),
    ]),
  ],
})
export class DropdownMenuComponent implements OnInit {
  notificationDropdownVisible = false;
  role: any;
  payload: any;
  leaveTrackerList: any[];
  defaultNotification:string = "no new notification"
  notificationList: any[];
  showNotificationsMenu: boolean = false;
  notificationCount: number;
  profile: any;
  profileAvatarUrl: any;
  menuState: string = '';
  myTripsUrl: string = '';
  settingsClass: string = '';
  UserData = localStorage.getItem('UserData');
  image: string = 'https://source.unsplash.com/c_GmwfHBDzk/200x200';
  user: string = '';
  @ViewChild('dropdown', { static: false }) dropdown!: ElementRef;
  @ViewChild('submenu', { static: false }) submenu!: ElementRef;
  adminDetails: any;
  id: string;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private LeaveService: LeaveService,
    private route: Router
  ) {
    this.user = localStorage.getItem('UserData');
    this.role = localStorage.getItem('role');
    console.log('asdfghjk', this.user);
  }

  ngOnInit() {
    this.getImage();
    this.settingsClass = '';
    this.menuState = 'close';
    this.getTableforLeaves();
  }

  toggleMenu() {
    if (this.menuState === 'open') {
      this.menuState = 'close';
    } else {
      this.menuState = 'open';
    }
  }

  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  @HostListener('window:click', ['$event']) onClick($event: MouseEvent) {
    if (
      (this.dropdown &&
        this.dropdown.nativeElement.contains($event.target) === false) ||
      this.submenu.nativeElement.contains($event.target)
    ) {
      this.menuState = 'close';
    }
  }

  onLogout() {
    window.localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
  getImage() {
    this.adminService.getAdminDetails(this.UserData).subscribe((res) => {
      if (res[0].image) {
        console.log('datalocal', this.UserData);
        this.image = res[0].image;
      }
    });
  }
  getTableforLeaves() {
    this.LeaveService.getNotificationList().subscribe((res) => {
      this.leaveTrackerList = res.filter(
        (item) => item.isNotificationStatus == false
      );
      this.notificationList = res.map((item) => item.notificationContent);
      this.notificationCount = this.leaveTrackerList.length;
    });
  }

  handleNotificationClick(id: string) {
    this.id = id;
    this.payload = {
      username: localStorage.getItem('email'),
    };
    this.LeaveService.editNotificationList(this.payload, this.id).subscribe(
      (res) => {
        if (res) {
          location.reload();
        }
      }
    );
    this.route.navigate(['/leaveMgmt/leave-approve-disapprove']);
  }
}
