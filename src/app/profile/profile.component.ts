import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private db: FirestoreService) { }

  ngOnInit() {
  }

}