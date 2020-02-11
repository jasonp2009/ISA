import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';


declare var gapi: any = null;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

	private calendarItemsData: any[] = [];

  constructor(
  	private auth: AuthService
  ) {
  	this.initClient();
  	this.auth.afAuth.auth.onAuthStateChanged((ud) => {
  		console.log("KAJGSJHJAVSLJH");
  		console.log(ud);
  		console.log(gapi);
  		if ((ud)) {
  			this.getCalendar();
  		}
  	});
  }


  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyAuJtgLw20jRupg1SQi2jWYw7exkmxMdtU',
        clientId: '957837373462-9nnsk59e6sffjpgqrvp7oj7ta7ahf62s.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })
      gapi.client.load('calendar', 'v3', () => {
      	console.log('loaded calendar');
      	console.log(gapi);
      	this.getCalendar();
      });
    });
  }

  log() {
  	console.log("LOGGED");
  }

	async getCalendar() {
		return gapi.client.calendar.events.list({
	    calendarId: 'primary',
	    timeMin: new Date().toISOString()
		}).then((ret) => {
			this.calendarItemsData = []
			ret.result.items.forEach((item) => {
				this.calendarItemsData = [...this.calendarItemsData,item];
			})
			console.log(this.calendarItemsData);
			return true;
		});
	}

	get calendarItems() {
		if (this.calendarItemsData == []) {
			this.getCalendar().then(() => {
				return this.calendarItemsData;
			})
		} else {
			return this.calendarItemsData;
		}
	}
}
