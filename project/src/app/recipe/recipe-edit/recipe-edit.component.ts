
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { CanComponentDeactivate } from './../../services/auth-guard-deactivate.service';
import { Recipe } from './../../model/recipe.model';
import * as fromRecipe from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.action';
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
                  , private router:Router,
                   private store:Store<fromRecipe.FeatureState>) {
      
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

    let name = "";
    let imageUrl = "";
    let description = "";
    this.ingredientList = new FormArray([])
    
    if(this.editMode == true){
        this.store.select('recipes').take(1).subscribe((data:fromRecipe.State) =>{
          
          const recipe = data.recipes[this.id];

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
          this.recipeForm = new FormGroup({
              name : new FormControl(name , Validators.required),
              imageUrl : new FormControl(imageUrl,Validators.required),
              description : new FormControl(description,Validators.required),
              ingredients: this.ingredientList
          });
        });
    }
    else {
      this.recipeForm = new FormGroup({
            name : new FormControl(name , Validators.required),
            imageUrl : new FormControl(imageUrl,Validators.required),
            description : new FormControl(description,Validators.required),
            ingredients: this.ingredientList
      });
   }
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
     const index = this.id;
     this.store.dispatch(new RecipeActions.UpdateRecipeAction({index , newRecipe}));
    }
    else{
      this.store.dispatch(new RecipeActions.AddRecipeAction(newRecipe));
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
    

    if(this.changesSaved == false){
        if(this.editMode == true){
          this.store.select('recipes').take(1).subscribe((data:fromRecipe.State) => {
            const recipe = data.recipes[this.id];
            if(recipe.name != this.recipeForm.value.name ||
                    recipe.description != this.recipeForm.value.description ||
                      recipe.imagePath != this.recipeForm.value.imageUrl){
                        return confirm("Do you want to save your changes?");
            }
            
            
          })
        }
        else{
            if(this.recipeForm.valid){
              return confirm("Do you want to save your changes?");
            }
            
        }
    }
    //else
    {
      console.log("Coming here");
      return true;
    }
  }

}
