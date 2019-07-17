import { Component, OnInit, Input } from '@angular/core';

import { ProfileService } from 'src/app/core/services/profile.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { ProfileData } from 'src/app/core/models/profile.model';

@Component({
	selector: 'app-profile-story',
	templateUrl: './profile-story.component.html',
	styleUrls: ['./profile-story.component.css'],
})
export class ProfileStoryComponent implements OnInit {
	@Input() profile: ProfileData;

	// private profilePhoto = this.profile.profile_photo;

	// Using placeholder data for now
	constructor(private profileService: ProfileService) {}

	ngOnInit() {
		console.log(this.profile);
	}
}
