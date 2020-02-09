import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  private userDoc: AngularFirestoreDocument<User>;
  user: User = {
    displayName: "John Smith",
    email: "johnsmith@gmail.com",
    photoURL: "johnsmith.jpg"
  };

  constructor (
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.afAuth.auth.onAuthStateChanged((ud) => {
      if (ud) {
        this.userDoc = afs.doc<User>('users/'+ud.uid);
        console.log("HERE");
        console.log(this.userDoc);
        // this.userDoc.set({
        //   displayName: ud.displayName,
        //   email: ud.email,
        //   photoURL: ud.photoURL
        // });
        this.userDoc.valueChanges().subscribe((data) => {
          if (!data) {
            this.userDoc.set({
              displayName: ud.displayName,
              email: ud.email,
              photoURL: ud.photoURL
            });
          } else {
            this.userDoc.update({
              displayName: ud.displayName,
              email: ud.email,
              photoURL: ud.photoURL
            });
          }
          console.log("CHANGED");
          console.log(data);
          this.user = data;
        });
      }
    });
  }

  loadUserData() {
    if (this.auth.user) {
      let userDoc = this.afs.doc('users/'+this.auth.user.uid);
      console.log(userDoc);
    } else {
      throw ("User data error");
    }
  }
}