import { Component, OnInit } from '@angular/core';
import { AuthService } from '../firebase/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth: AuthService, private router: Router) {
  }

  login() {
    this.auth.login().then((ret) => {
      this.router.navigate(['profile']);
      return;
    })
  }

  logout() {
    this.auth.logout().then((ret) => {
      return;
    })
  }
}