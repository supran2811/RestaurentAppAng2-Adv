import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(private authService:AuthService ,
               private router:Router) { }

  ngOnInit() {
  }
  
  onSignUp(form:NgForm){
    const email  = form.value.email;
    const password = form.value.password;
    this.authService.signUpUser(email,password)
          .then(
               (response) => {
                      this.router.navigate(['/signIn']);
               }
          )
          .catch(
            error => console.log(error)
          );
  }
}
