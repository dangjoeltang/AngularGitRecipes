import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from './core/services/user-auth.service';

import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	@ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

	constructor(
		private userService: UserAuthService,
		private toastrService: ToastrService
	) {}

	ngOnInit() {
		this.userService.populate();
		this.toastrService.overlayContainer = this.toastContainer;
	}
}
