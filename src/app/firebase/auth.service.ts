import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
    console.log(afAuth.auth.currentUser);
  }

  public login() {
    if (this.user) {
      console.log(this.afAuth.auth.currentUser);
      throw("Already logged in");
    } else {
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL);
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider).then(ret => {
        console.log(ret);
        console.log(this.afAuth.user);
      }).catch(ret => {
        console.log(ret);
      });
    }
  }
  public logout() {
    if (!this.user) {
      throw ("Already logged out");
    } else {
      this.afAuth.auth.signOut();
    }
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }
}