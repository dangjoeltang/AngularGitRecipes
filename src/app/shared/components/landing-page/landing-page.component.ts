import { Component, OnInit } from '@angular/core';

import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { User } from 'src/app/core/models';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
	private currentUser: User;

	constructor(private userService: UserAuthService) {}

	ngOnInit() {
		this.userService.currentUser.subscribe(userData => {
			this.currentUser = userData;
		});
	}
}
