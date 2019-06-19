import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
	constructor(
		private router: Router,
		private userAuthService: UserAuthService,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.userAuthService.purgeAuth();
		this.alertService.success('Logged out!', true);
		this.router.navigateByUrl('/auth');
	}
}
