import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


enum Status {
  loggedOut,
  loggingIn,
  loggedIn,
  loggingOut
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public Status = Status;
  public user = JSON.parse(localStorage.getItem('currentUser'));
  public curStatus = this.user ? Status.loggedIn : Status.loggedOut;

  constructor (
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    if (this.user) {
      console.log("Signed in as ", this.user.displayName);
      console.log(this.user);
    } else {
      console.log("Not signed in");
    }
    afAuth.auth.onAuthStateChanged((ud) => {
      this.user = ud;
      localStorage.setItem("currentUser", JSON.stringify(ud));
      console.log("Auth state changed");
      console.log(ud);
      if (ud) {
        this.curStatus = Status.loggedIn;
      } else {
        this.curStatus = Status.loggedOut;
      }
    });
  }

  public async login() {
    this.curStatus = Status.loggingIn;
    if (this.user) {
      console.log(this.user);
      throw("Already logged in");
      this.curStatus = Status.loggedIn;
      return null;
    } else {
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL);
      const provider = new auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/calendar");
      return this.afAuth.auth.signInWithPopup(provider).then(ret => {
        console.log("Successfully logged in");
        console.log(ret.user);
        this.user = ret.user;
        this.curStatus = Status.loggedIn;
        return ret.user;
      }).catch(ret => {
        console.log("Error logging in");
        throw(ret);
        this.user = null;
        this.curStatus = Status.loggedOut;
        return null;
      });
    }
  }
  public async logout() {
    this.curStatus = Status.loggingOut;
    if (!this.user) {
      throw ("Already logged out");
      this.curStatus = Status.loggedOut;
      return null;
    } else {
      return this.afAuth.auth.signOut().then( () => {
        this.curStatus = Status.loggedOut;
        this.router.navigate([""]);
        return null;
      });
    }
  }
}