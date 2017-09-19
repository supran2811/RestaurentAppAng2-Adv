import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  
  loadedFeature = "recipe";
  
   navigateTo(feature:string){
     this.loadedFeature = feature;
   }
  
    ngOnInit(){
      firebase.initializeApp({
        apiKey: "AIzaSyDTfyYaIBMnzkYZtkFIfEVqVf-_znhoRE4",
        authDomain: "my-recipe-book-b5271.firebaseapp.com"
      });
    }

}
