
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import * as fromAppState from '../../../app/store/app.reducer';
import * as AuthActions from '../store/auth.action';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  constructor(private router:Router,
                     private store:Store<fromAppState.AppState>) { }

  ngOnInit() {
  }

  onSignIn(form:NgForm){
    const email  = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.DoSignInAction({username:email,password:password}));
  }
}
