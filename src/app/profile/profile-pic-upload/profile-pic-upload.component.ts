import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
	selector: 'app-profile-pic-upload',
	templateUrl: './profile-pic-upload.component.html',
	styleUrls: ['./profile-pic-upload.component.css'],
})
export class ProfilePicUploadComponent implements OnInit {
	@Input() imageSrc: string;
	private signedRes;
	private file;
	private profilePhotoUrl: string;
	private isDisabled: boolean = true;

	constructor(
		private api: ApiService,
		private http: HttpClient,
		private alertService: AlertService
	) {}

	ngOnInit() {}

	// Send metadata to signing service
	private onFileSelect(file) {
		if (file.target.files && file.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event: any) => {
				this.imageSrc = event.target.result;
			};
			reader.readAsDataURL(file.target.files[0]);
		}

		this.file = file.target.files[0];
		const file_name = 'profile-photos/' + file.target.files[0].name;
		const file_type = file.target.files[0].type;
		// this.alertService.info(`${file_name} selected.`);

		this.api
			.post('sign_s3/', {
				file_name: file_name,
				file_type: file_type,
			})
			.subscribe(res => {
				this.signedRes = res;
				this.isDisabled = false;
				console.log(res);
				this.profilePhotoUrl = res.url;
				console.log(this.profilePhotoUrl);
			});
	}

	uploadPhoto() {
		const url = this.signedRes.data['url'];
		const fields = this.signedRes.data['fields'];
		const files = { file: this.file };

		console.log(fields);
		// upload file to S3
		let formData: FormData = new FormData();
		Object.keys(fields).forEach(key => formData.append(key, fields[key]));
		formData.append('file', this.file);
		// Post formdata with file and authorization to S3
		return this.http.post(url, formData).subscribe(res => {
			console.log(res);
		});
	}
}
