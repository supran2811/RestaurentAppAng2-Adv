import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { RecipeListService } from '../../services/recipe-list.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  
  // @Output() featureSelected = new EventEmitter<string>(); 
  

  constructor(private recipeListService:RecipeListService , 
                  private router:Router,
                  public  authServce:AuthService) { }

  ngOnInit() {
  }
  
  onSave(){
    this.recipeListService.save();
  }

  onFetch(){
    this.recipeListService.sync();
    this.router.navigate(["recipes"]);
  }

  logOut(){
    this.authServce.signOut().then(
      () => this.router.navigate(['signIn'])
    )
    .catch(
      error => console.log(error)
    );
    
  }
  // onSelect(feature:string){
  //    this.featureSelected.emit(feature);
  // }

}
