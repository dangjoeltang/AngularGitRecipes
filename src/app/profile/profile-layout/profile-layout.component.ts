import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileData } from 'src/app/core/models/profile.model';

@Component({
	selector: 'app-profile-layout',
	templateUrl: './profile-layout.component.html',
	styleUrls: ['./profile-layout.component.css'],
})
export class ProfileLayoutComponent implements OnInit {
	profile: ProfileData;
	private closeResult: string;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.data.subscribe((data: { profile: ProfileData }) => {
			this.profile = data.profile;
		});
	}
}
