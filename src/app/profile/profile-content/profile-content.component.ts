import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { RecipeDetail } from 'src/app/core/models';

@Component({
	selector: 'app-profile-content',
	templateUrl: './profile-content.component.html',
	styleUrls: ['./profile-content.component.css'],
})
export class ProfileContentComponent implements OnInit {
	recipeList: RecipeDetail[];

	constructor(private profile: ProfileService) {}

	ngOnInit() {
		this.profile.getAllRecipes().subscribe(res => (this.recipeList = res));
	}
}
