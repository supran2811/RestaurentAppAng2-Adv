

import { Action } from '@ngrx/store';
export const DO_SIGNUP = "DO_SIGNUP";
export const DO_SIGNIN = "DO_SIGNIN";
export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";
export const SET_TOKEN = "SET_TOKEN";

export class SignUpAction implements Action {
    readonly type = SIGNUP;
}

export class SignInAction implements Action {
    readonly type = SIGNIN;
}

export class SignOutAction implements Action {
    readonly type = SIGNOUT;
}

export class SetTokenAction implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload:string){}
}

export class DoSignupAction implements Action {
    readonly type = DO_SIGNUP;
    constructor(public payload : {username : string , password:string}){}
}


export class DoSignInAction implements Action {
    readonly type = DO_SIGNIN;
    constructor(public payload : {username : string , password:string}){}
}



export type AuthActions = SignUpAction |
                          SignInAction |
                          SignOutAction |
                          SetTokenAction |
                          DoSignupAction |
                          DoSignInAction;