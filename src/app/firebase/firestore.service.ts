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

export interface TodoId extends Todo {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  private userDoc: AngularFirestoreDocument<User>;
  public user: User = null;

  private todosCollection: AngularFirestoreCollection<Todo>;
  public todos: TodoId[] = null;

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
        this.todosCollection = this.userDoc.collection<Todo>('todos');
        this.todosCollection.snapshotChanges().subscribe((data) => {
          console.log("Snapshot changes");
          console.log(data);
          this.todos = [];
          data.forEach((td) => {
            let tdDoc = td.payload.doc
            this.todos = [...this.todos, {
              id: tdDoc.id,
              title: tdDoc.data().title,
              duration: tdDoc.data().duration,
              due: tdDoc.data().due,
              completed: tdDoc.data().completed
            }];
          })
        })
      }
    });
  }

  addTodo(todo: Todo) {
    this.todosCollection.add(todo);
  }

  editTodo(todo: TodoId) {
    this.todosCollection.doc<Todo>(todo.id).update(todo);
  }

  deleteTodo(todo: TodoId) {
    this.todosCollection.doc<Todo>(todo.id).delete();
  }
}