import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoListComponent, TodoEditor } from './todo-list/todo-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './firebase/auth.service';
import { CalendarService } from './firebase/calendar.service';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FirestoreService } from './firebase/firestore.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './calendar/calendar.component';


const firebaseConfig = {
  apiKey: "AIzaSyC_mf2JdKxHVn9oH6hviy5_vgejYUGvNG4",
  authDomain: "scheduler-65eb0.firebaseapp.com",
  databaseURL: "https://scheduler-65eb0.firebaseio.com",
  projectId: "scheduler-65eb0",
  storageBucket: "scheduler-65eb0.appspot.com",
  messagingSenderId: "730052533010",
  appId: "1:730052533010:web:4df1ea6f27cd22e9db71cb",
  measurementId: "G-LXVSEEMXYT"
};

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'todoList', component: TodoListComponent},
  { path: 'calendar', component: CalendarComponent}
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    TodoListComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    TodoEditor,
    CalendarComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AuthService,
    FirestoreService,
    CalendarService
  ],
  entryComponents: [
    TodoEditor
  ]
})
export class AppModule { }
