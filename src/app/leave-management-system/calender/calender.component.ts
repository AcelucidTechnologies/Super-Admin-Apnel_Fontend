import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LeaveService } from 'src/app/_services/leave.service';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent {
  calendarOptions: CalendarOptions;
  calenderList:any
  eventList: EventInput[] = [];

  constructor( private leaveservice: LeaveService,
    private toastr: ToastrMsgService,
    private ngxLoader: NgxUiLoaderService,
    ){

  }
  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
    };
    this.getCalendar()
  }

  getCalendar() {
    this.leaveservice.getcalenderList().subscribe((res) => {
      this.calenderList = res;
      console.log("response 24==>", res);

      // Map the response data to the FullCalendar event format
      const events = [];
      this.eventList = events;
      Object.keys(this.calenderList).forEach((month) => {
        this.calenderList[month].forEach((holiday) => {
          if (holiday.date) {
            events.push({
              title: holiday.name,
              start: holiday.date,
            });
          }
        });
      });

      this.calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        events: events,

      };



      this.ngxLoader.stop();
    });
  }




}
