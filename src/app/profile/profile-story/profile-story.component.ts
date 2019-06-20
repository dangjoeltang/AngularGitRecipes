import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-profile-story',
	templateUrl: './profile-story.component.html',
	styleUrls: ['./profile-story.component.css'],
})
export class ProfileStoryComponent implements OnInit {
	private currentUser = {
		recipe_count: 6,
		date_created: '6/20/2019',
	};
	constructor() {}

	ngOnInit() {}
}
