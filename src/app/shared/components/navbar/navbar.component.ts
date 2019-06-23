import { Component, OnInit } from '@angular/core';

import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { User } from 'src/app/core/models';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	isNavbarCollapsed = true;
	currentUser: User;

	constructor(
		private router: Router,
		private userService: UserAuthService,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.userService.currentUser.subscribe(userData => {
			this.currentUser = userData;
			// console.log(this.currentUser);
		});
	}
}
