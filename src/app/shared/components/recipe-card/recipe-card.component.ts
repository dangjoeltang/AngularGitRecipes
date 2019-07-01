import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-recipe-card',
	templateUrl: './recipe-card.component.html',
	styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
	@Input() recipeTitle: string;
	@Input() recipeId: number;

	constructor() {}

	ngOnInit() {}
}
