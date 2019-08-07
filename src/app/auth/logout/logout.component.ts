import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
	constructor(
		private router: Router,
		private userAuthService: UserAuthService,
		private alertService: ToastrService
	) {}

	ngOnInit() {
		this.userAuthService.purgeAuth();
		this.alertService.success('Logged out!');
		this.router.navigateByUrl('/auth');
	}
}
