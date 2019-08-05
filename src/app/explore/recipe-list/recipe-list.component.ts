import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { RecipeDetail } from 'src/app/core/models';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
	recipeList: RecipeDetail[];

	constructor(private recipeService: RecipeService) {}

	ngOnInit() {
		this.recipeService
			.getAllRecipes()
			.subscribe(res => (this.recipeList = res));
	}
}
