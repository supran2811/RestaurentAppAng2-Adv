import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  constructor(private authService:AuthService,
                     private router:Router) { }

  ngOnInit() {
  }

  onSignIn(form:NgForm){
    const email  = form.value.email;
    const password = form.value.password;
    this.authService.signInUser(email,password).then(
        (response) => {
             this.authService.getToken();
             this.router.navigate(['/recipes']);
        }
    );
  }
}
