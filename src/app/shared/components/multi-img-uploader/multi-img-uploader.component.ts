import { Component, OnInit, Output } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AlertService } from 'src/app/core/services/alert.service';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-multi-img-uploader',
	templateUrl: './multi-img-uploader.component.html',
	styleUrls: ['./multi-img-uploader.component.css'],
})
export class MultiImgUploaderComponent implements OnInit {
	@Output() valueChange = new EventEmitter();

	// private apiUrl = environment.api_url;
	private photosArray = [];
	private imageSrc: string[] = [];
	private isDisabled: boolean = true;

	constructor(
		private api: ApiService,
		private http: HttpClient,
		private alertService: ToastrService
	) {}

	ngOnInit() {}

	private addPhoto(photoName) {
		this.photosArray.push(photoName);
		// console.log('Photos array (for form output): ', this.photosArray.value);
	}

	private removePhoto(index) {
		const removedPhoto = this.photosArray[index];
		this.photosArray.splice(index, 1);
		this.imageSrc.splice(index, 1);
		this.valueChange.emit(this.photosArray);
		this.alertService.success(`Removed photo "${removedPhoto}"`);
	}

	private onFileSelect(file) {
		if (file.target.files && file.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event: any) => {
				this.imageSrc.push(event.target.result);
			};
			reader.readAsDataURL(file.target.files[0]);
		}
		let imgFile = file.target.files[0];
		// console.log('Selected file: ', this.file);
		// console.log('imageSrc[] (for previews): ', this.imageSrc);

		const file_name = 'recipe-photos/' + file.target.files[0].name;
		const file_type = file.target.files[0].type;
		this.alertService.info(`${file_name} selected.`);

		this.api
			.post('sign_s3/', {
				file_name: file_name,
				file_type: file_type,
			})
			.subscribe(res => {
				this.isDisabled = false;

				this.addPhoto(res.path);
				this.uploadPhoto(res.data['url'], res.data['fields'], imgFile);
			});
	}

	private uploadPhoto(url: string, fields, file) {
		let formData: FormData = new FormData();
		Object.keys(fields).forEach(key => formData.append(key, fields[key]));
		formData.append('file', file);
		// Post formdata with file and authorization to S3

		return this.http.post(url, formData).subscribe(
			res => {
				console.log('file posted to S3', file.name);
				this.valueChange.emit(this.photosArray);
				this.alertService.success(
					`${file.name} uploaded successfully!`
				);
			},
			error => {
				console.log('Something went wrong: ', error);
				this.alertService.error(
					'Something went wrong with the upload.'
				);
			}
		);
	}
}
