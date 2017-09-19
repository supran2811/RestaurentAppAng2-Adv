import { Observable } from 'rxjs/Rx';
import { CanComponentDeactivate } from './../../services/auth-guard-deactivate.service';
import { Recipe } from './../../model/recipe.model';
import { RecipeListService } from '../../services/recipe-list.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit ,CanComponentDeactivate{

  id:number;
  editMode = false;
  recipeForm : FormGroup;
  changesSaved = false;

  ingredientList:FormArray;

  constructor(private route:ActivatedRoute 
                  , private recipeListService : RecipeListService
                  , private router:Router) {
      
   }


  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
      }
    );
  }


  initForm(){
    const recipe = this.recipeListService.getRecipe(this.id);
    
    let name = "";
    let imageUrl = "";
    let description = "";
    this.ingredientList = new FormArray([])
    if(recipe != null){
         name = recipe.name;
         imageUrl = recipe.imagePath;
         description = recipe.description;
         for(let i=0;i<recipe.ingredients.length;i++){
          this.ingredientList.push( new FormGroup({
                     name : new FormControl(recipe.ingredients[i].name ,Validators.required),
                     amount : new FormControl(recipe.ingredients[i].amount,
                             [Validators.required ,Validators.pattern(/[1-9]+[0-9]*$/)])
              }) );
         }
    }
    
    this.recipeForm = new FormGroup({
          name : new FormControl(name , Validators.required),
          imageUrl : new FormControl(imageUrl,Validators.required),
          description : new FormControl(description,Validators.required),
          ingredients: this.ingredientList
    });
  }
  
 

  onAddIngredient(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
          new FormGroup({
             'name'  : new FormControl(null , Validators.required),
             'amount' : new FormControl(null , [Validators.required ,Validators.pattern(/[1-9]+[0-9]*$/)])
          })
      );
  }

  onSubmitForm(){
    this.changesSaved = true;
    let newRecipe = new Recipe(this.recipeForm.value.name 
                                , this.recipeForm.value.description 
                                ,  this.recipeForm.value.imageUrl
                                , this.recipeForm.value.ingredients);

    if(this.editMode == true){
       this.recipeListService.updateRecipe(this.id , newRecipe); 
    }
    else{
       this.recipeListService.addRecipe(newRecipe); 
    }
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onCancelForm(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  removeIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean{
    const recipe = this.recipeListService.getRecipe(this.id);

    if(this.changesSaved == false){
    if(recipe != null){
         
        if(recipe.name != this.recipeForm.value.name ||
                recipe.description != this.recipeForm.value.description ||
                   recipe.imagePath != this.recipeForm.value.imageUrl){
                    return confirm("Do you want to save your changes?");
                   }
    }
     else{
        if(this.recipeForm.valid){
          return confirm("Do you want to save your changes?");
        }
     }
    }

     return true;
  }

}
