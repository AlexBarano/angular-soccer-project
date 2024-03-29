import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  logOut() {
    this.authService.logOut();
  }
  switchToMapPage() {
    this.authService.switchToMapPage();
  }
  switchToMainPage() {
    this.authService.switchToMainPage();
  }
}
