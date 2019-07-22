import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-profile-pic-upload',
	templateUrl: './profile-pic-upload.component.html',
	styleUrls: ['./profile-pic-upload.component.css'],
})
export class ProfilePicUploadComponent implements OnInit {
	private signedRes;

	constructor() {}

	ngOnInit() {}

	private fileChangeEvent(file) {}
}
