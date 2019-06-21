import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
	private recipe_id;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.recipe_id = params.get('recipe_id');
		});
	}
}
