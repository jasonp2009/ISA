import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';

export interface User {
  displayName: string;
  email: string;
}

@Injectable()
export class FirestoreService {

  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;

  constructor() { }

}

// export class AppComponent {
//   private itemDoc: AngularFirestoreDocument<Item>;
//   item: Observable<Item>;
//   constructor(private afs: AngularFirestore) {
//     this.itemDoc = afs.doc<Item>('items/1');
//     this.item = this.itemDoc.valueChanges();
//   }
//   update(item: Item) {
//     this.itemDoc.update(item);
//   }
// }