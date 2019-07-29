import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { RecipeDetail } from 'src/app/core/models';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileData } from 'src/app/core/models/profile.model';

@Component({
	selector: 'app-profile-recipes',
	templateUrl: './profile-recipes.component.html',
	styleUrls: ['./profile-recipes.component.css'],
})
export class ProfileRecipesComponent implements OnInit {
	// profileId = this.userService.currentUserValue.profile_id;
	profile;
	recipeList: RecipeDetail[];

	constructor(
		private route: ActivatedRoute,
		private profileService: ProfileService,
		private userService: UserAuthService
	) {}

	ngOnInit() {
		this.route.data.subscribe((data: { profile: ProfileData }) => {
			this.profile = data.profile;
		});
		this.profileService
			.getUserRecipes(this.profile.id)
			.subscribe(res => (this.recipeList = res));
	}
}
