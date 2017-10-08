
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import * as fromAppState from '../../store/app.reducer';
import * as AuthActions from '../store/auth.action';
import * as fromAuth from '../store/auth.reducer';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(private router:Router,
               private store:Store<fromAppState.AppState>
               ) { }

  ngOnInit() {
   console.log("Init signupForm");
    this.store.select('auth').map((authState:fromAuth.State) =>{
      console.log("123"+authState);
    })

  }
  
  onSignUp(form:NgForm){
    const email  = form.value.email;
    const password = form.value.password;
    // this.authService.signUpUser(email,password)
    //       .then(
    //            (response) => {
    //                   this.store.dispatch(new SignUpAction());
    //                   this.router.navigate(['/signIn']);
    //            }
    //       )
    //       .catch(
    //         error => console.log(error)
    //       );

    this.store.dispatch(new AuthActions.DoSignupAction({username:email,password:password}));
  }
}
