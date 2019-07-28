import { Component, OnInit, Input } from '@angular/core';
import { RecipeDetail } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-recipe-card',
	templateUrl: './recipe-card.component.html',
	styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
	@Input() recipe: RecipeDetail;

	// @Input() recipePhoto: string = 'https://via.placeholder.com/150x100';

	private mediaUrl = environment.media_url;
	private imageUrls: string[];

	constructor() {}

	ngOnInit() {
		this.imageUrls = this.recipe.recipe_photos.map(
			pName => `${this.mediaUrl}/${pName.photo_file}`
		);
	}
}
