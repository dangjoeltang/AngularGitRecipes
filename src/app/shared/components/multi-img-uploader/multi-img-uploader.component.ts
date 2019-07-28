import { Component, OnInit, Output, Input } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AlertService } from 'src/app/core/services/alert.service';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-multi-img-uploader',
	templateUrl: './multi-img-uploader.component.html',
	styleUrls: ['./multi-img-uploader.component.css'],
})
export class MultiImgUploaderComponent implements OnInit {
	@Output() valueChange = new EventEmitter();
	@Input() events: Observable<any>;

	private eventsSubscription: any;
	// private apiUrl = environment.api_url;
	imageSrc: string[] = [];
	photosArray = [];
	private isDisabled: boolean = true;

	// 'https://dcrfk60sixql7.cloudfront.net'
	private mediaUrl = environment.media_url;

	constructor(
		private api: ApiService,
		private http: HttpClient,
		private alertService: ToastrService
	) {}

	ngOnInit() {
		try {
			this.eventsSubscription = this.events.subscribe(photoNames => {
				this.populateImages(photoNames);
			});
		} catch (error) {
			if (error instanceof TypeError) {
				console.log(
					'Nothing to subscribe to. Are you playing in the sandbox?'
				);
			}
		}
	}

	private populateImages(data) {
		this.photosArray = data;
		this.imageSrc = data.map(pName => `${this.mediaUrl}/${pName}`);
		this.valueChange.emit(this.photosArray);
	}

	private addPhoto(photoName) {
		this.photosArray.push(photoName);
		console.log('Photos array (for form output): ', this.photosArray);
	}

	private removePhoto(index) {
		const removedPhoto = this.photosArray[index];
		this.photosArray.splice(index, 1);
		this.imageSrc.splice(index, 1);
		console.log(this.photosArray, this.imageSrc);
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
				console.log(res);
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
