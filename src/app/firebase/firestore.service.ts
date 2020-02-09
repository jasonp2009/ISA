import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
}

export interface Todo {
  title: string;
  duration: number;
  due: Date;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  private userDoc: AngularFirestoreDocument<User>;
  user: User = null;

  private todosDoc: AngularFirestoreCollection<Todo>;
  todos: Todo[] = null;

  constructor (
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.afAuth.auth.onAuthStateChanged((ud) => {
      if (ud) {
        this.userDoc = afs.doc<User>('users/'+ud.uid);
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
          console.log("USER DATA");
          console.log(data);
          this.user = data;
        });
        this.todosDoc = this.userDoc.collection<Todo>('todos');
        this.todosDoc.valueChanges().subscribe((data) => {
          console.log("TODO DATA");
          console.log(data);
          this.todos = data;
        })
      }
    });
  }

  // loadUserData() {
  //   if (this.auth.user) {
  //     let userDoc = this.afs.doc('users/'+this.auth.user.uid);
  //     console.log(userDoc);
  //   } else {
  //     throw ("User data error");
  //   }
  // }
}