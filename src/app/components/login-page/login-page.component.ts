import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['main']);
    }
  }

  login() {
    if (
      this.auth.login(
        this.email.nativeElement.value,
        this.password.nativeElement.value
      )
    ) {
      this.router.navigate(['main']);
    } else {
      alert('Unauthorized email address');
    }
  }
}
