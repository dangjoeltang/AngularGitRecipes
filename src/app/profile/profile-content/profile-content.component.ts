import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { RecipeDetail } from 'src/app/core/models';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
	selector: 'app-profile-content',
	templateUrl: './profile-content.component.html',
	styleUrls: ['./profile-content.component.css'],
})
export class ProfileContentComponent implements OnInit {
	profileId = this.userService.currentUserValue.profile_id;
	recipeList: RecipeDetail[];

	constructor(
		private profile: ProfileService,
		private userService: UserAuthService
	) {}

	ngOnInit() {
		this.profile.getAllRecipes().subscribe(res => (this.recipeList = res));
	}
}
