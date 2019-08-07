import { Component, OnInit } from '@angular/core';
import { RecipeDetail } from 'src/app/core/models';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.scss'],
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
