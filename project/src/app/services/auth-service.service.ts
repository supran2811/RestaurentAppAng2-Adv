
import * as firebase from 'firebase';

export class AuthService{
    private token:string;

    signUpUser(email:string , password:string){
        return firebase.auth().createUserWithEmailAndPassword(email,password);
    }

    signInUser(email:string,password:string){
        return firebase.auth().signInWithEmailAndPassword(email,password);
    }
    
    signOut(){
        this.token = null;
        return firebase.auth().signOut();
    }

    getToken(){
       firebase.auth().currentUser.getToken()
                .then(
                    token => this.token = token
                )
                .catch(
                    errors => console.log(errors)
                );
       
      return this.token;          
    }

    isAuthenticated(){
        return this.token != null;
    
     
    }
}