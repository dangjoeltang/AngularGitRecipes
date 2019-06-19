import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './core/services/user-auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(private userService: UserAuthService) {}

	ngOnInit() {
		this.userService.populate();
	}
}
