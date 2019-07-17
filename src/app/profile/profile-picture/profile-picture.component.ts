import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'profile-picture',
	templateUrl: './profile-picture.component.html',
	styleUrls: ['./profile-picture.component.css'],
})
export class ProfilePictureComponent implements OnInit {
	private _photoPath;
	private mediaRoot = 'https://dcrfk60sixql7.cloudfront.net/media';

	constructor() {}

	get photoPath(): string {
		return this._photoPath;
	}

	@Input()
	set photoPath(path: string) {
		console.log('got path: ', path);
		this._photoPath = `${this.mediaRoot}/${path}`;
		console.log(this._photoPath);
	}

	ngOnInit() {}
}
