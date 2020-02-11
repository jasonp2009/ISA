import { Component, OnInit } from '@angular/core';

import { CalendarService } from '../firebase/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private cs: CalendarService) { }

  ngOnInit() {
  }

}
