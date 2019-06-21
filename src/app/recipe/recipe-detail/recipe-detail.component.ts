import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetail } from 'src/app/core/models';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
	private recipe_id;
	private recipe: RecipeDetail;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.data.subscribe((data: { recipe: RecipeDetail }) => {
			this.recipe = data.recipe;
			console.log(this.recipe);
		});
	}
}
