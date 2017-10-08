import * as AuthActions from './auth.action';


export interface State {
    token:string;
    authorised:boolean;
};

const initialState:State = {
    token : null,
    authorised:false
};

export function AuthReducer(state = initialState, action:AuthActions.AuthActions){

    switch(action.type){
        case AuthActions.SIGNIN:
        case AuthActions.SIGNUP:{
             return {
                ...state,
                authorised : true
             }
        }

        case AuthActions.SET_TOKEN:{
            return {
                ...state,
                token : action.payload
            }
        }

        case AuthActions.SIGNOUT:{
            return {
                ...state,
                token : null,
                authorised : false
            }
        }
        default:{
            return state;
        }
    }
    
    
}