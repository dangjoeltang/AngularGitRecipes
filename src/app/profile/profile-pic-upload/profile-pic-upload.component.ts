import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ProfileData } from 'src/app/core/models/profile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-profile-pic-upload',
	templateUrl: './profile-pic-upload.component.html',
	styleUrls: ['./profile-pic-upload.component.css'],
})
export class ProfilePicUploadComponent implements OnInit {
	private mediaRoot = environment.media_url;
	private apiUrl = environment.api_url;

	_photoPath: string;
	private _profile: ProfileData;
	private profileUrl: string;
	private signedRes;
	private file;
	private profilePhotoUrl: string;
	private profilePhotoName: string;
	isDisabled: boolean = true;
	showSpinner: boolean = false;

	@Input()
	set profile(profile: ProfileData) {
		this._profile = profile;
		this.profileUrl = `${this.apiUrl}profiles/${profile.id}/`;
	}

	get profile(): ProfileData {
		return this._profile;
	}

	@Input()
	set photoPath(path: string) {
		// console.log('got path: ', path);
		this._photoPath = `${this.mediaRoot}/${path}`;
		// console.log(this._photoPath);
	}

	get photoPath(): string {
		return this._photoPath;
	}

	constructor(
		private api: ApiService,
		private http: HttpClient,
		private alertService: ToastrService
	) {}

	ngOnInit() {}

	// Send metadata to signing service
	onFileSelect(file) {
		if (file.target.files && file.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event: any) => {
				this._photoPath = event.target.result;
			};
			reader.readAsDataURL(file.target.files[0]);
		}

		this.file = file.target.files[0];

		const file_name = 'profile-photos/' + file.target.files[0].name;
		const file_type = file.target.files[0].type;
		this.alertService.info(`${file_name} selected.`);

		this.api
			.post('sign_s3/', {
				file_name: file_name,
				file_type: file_type,
			})
			.subscribe(res => {
				this.signedRes = res;
				this.isDisabled = false;
				// console.log(res);
				this.profilePhotoUrl = res.url;
				this.profilePhotoName = res.path;
			});
	}

	onSubmit() {
		const url = this.signedRes.data['url'];
		const fields = this.signedRes.data['fields'];
		this.showSpinner = true;
		this.isDisabled = true;

		// console.log(fields);

		// upload file to S3
		let formData: FormData = new FormData();
		Object.keys(fields).forEach(key => formData.append(key, fields[key]));
		formData.append('file', this.file);

		// console.log(JSON.stringify(formData));

		// Post formdata with file and authorization to S3
		this.http.post(url, formData).subscribe(
			res => {
				this._profile.profile_photo = this.profilePhotoName;
				this.api
					.put(`profiles/${this._profile.id}/`, this._profile)
					// .patch(this.profileUrl, { profile_photo: this.profilePhotoName })
					.subscribe(
						res => {
							this.alertService.success(
								'Successfully change profile picture!'
							);
							this.showSpinner = false;
							// this.isDisabled = false;
						},
						err => {
							this.alertService.error(err.error);
							this.showSpinner = false;
							this.isDisabled = false;
						}
					);
			},
			error => {
				this.alertService.error(error.error.detail);
				this.showSpinner = false;
				this.isDisabled = false;
				console.log(error.error.detail);
			}
		);
	}

	// uploadPhoto() {
	// 	this._profile.profile_photo = this.profilePhotoName;

	// 	// PUT profile_photo path data to api
	// 	return (
	// 		this.api
	// 			.put(`profiles/${this._profile.id}/`, this._profile)
	// 			// .patch(this.profileUrl, { profile_photo: this.profilePhotoName })
	// 			.subscribe(
	// 				res => {
	// 					this.alertService.success('Success!');
	// 					console.log(res);
	// 				},
	// 				err => {
	// 					this.alertService.error(err.error);
	// 					console.log(err.error);
	// 				}
	// 			)
	// 	);
	// }
}
