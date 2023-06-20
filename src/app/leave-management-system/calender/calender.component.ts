import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent {
  calendarOptions: CalendarOptions;

  ngOnInit() {
  //   this.calendarOptions = {
  //     initialView: 'dayGridMonth',
  //     events: [

  //       { title: 'Event 1', date: '2023-06-20' }
  //     ]
  //   };
  }
}
