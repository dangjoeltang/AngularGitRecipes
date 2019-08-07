import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetail } from 'src/app/core/models';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
	recipe: RecipeDetail;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.data.subscribe((data: { recipe: RecipeDetail }) => {
			this.recipe = data.recipe;
			// console.log(this.recipe);
		});
	}
}
