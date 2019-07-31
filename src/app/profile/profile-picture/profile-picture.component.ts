import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'profile-picture',
	templateUrl: './profile-picture.component.html',
	styleUrls: ['./profile-picture.component.css'],
})
export class ProfilePictureComponent implements OnInit {
	_photoPath;
	private mediaRoot = environment.media_url;

	constructor() {}

	get photoPath(): string {
		return this._photoPath;
	}

	@Input()
	set photoPath(path: string) {
		// console.log('got path: ', path);
		this._photoPath = `${this.mediaRoot}/${path}`;
		// console.log(this._photoPath);
	}

	ngOnInit() {}
}
