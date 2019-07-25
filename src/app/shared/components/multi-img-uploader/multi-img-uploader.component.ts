import { Component, OnInit, Output } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormArray,
	FormControl,
	Validators,
} from '@angular/forms';
// import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AlertService } from 'src/app/core/services/alert.service';
import { EventEmitter } from 'events';

const URL = 'https://httpbin.org/post';

@Component({
	selector: 'app-multi-img-uploader',
	templateUrl: './multi-img-uploader.component.html',
	styleUrls: ['./multi-img-uploader.component.css'],
})
export class MultiImgUploaderComponent implements OnInit {
	// private apiUrl = environment.api_url;
	// private photos = [];
	// private profilePhotoUrl: string;
	// private profilePhotoName: string;
	private photoForm: FormGroup;
	private form;
	private file;

	private signedRes;
	private imageSrc: string[] = [];
	private presignedUrls = [];
	private isDisabled: boolean = true;

	@Output() valueChange = new EventEmitter();

	constructor(
		private fb: FormBuilder,
		private api: ApiService,
		private http: HttpClient,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.photoForm = this.createPhotoForm();
	}

	createPhotoForm() {
		this.form = this.fb.group({
			photos: this.fb.array([]),
		});

		return this.form;
	}

	get photosArray() {
		return this.photoForm.get('photos') as FormArray;
	}

	private addPhoto(photoName) {
		this.photosArray.push(
			this.fb.group({
				photo_file: [photoName],
			})
		);
		console.log('Photos array (for form output): ', this.photosArray.value);
	}

	private removePhoto(index) {
		this.photosArray.removeAt(index);
		this.imageSrc.splice(index, 1);
		this.file = void 0;
		console.log(this.file);
	}

	private onFileSelect(file) {
		if (file.target.files && file.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event: any) => {
				this.imageSrc.push(event.target.result);
			};
			reader.readAsDataURL(file.target.files[0]);
		}
		this.file = file.target.files[0];
		console.log('Selected file: ', this.file);
		console.log('imageSrc[] (for previews): ', this.imageSrc);
		const file_name = 'recipe-photos/' + file.target.files[0].name;
		const file_type = file.target.files[0].type;
		this.alertService.info(`${file_name} selected.`);

		this.api
			.post('sign_s3/', {
				file_name: file_name,
				file_type: file_type,
			})
			.subscribe(res => {
				console.log('Presigned url data: ', res);

				this.signedRes = res;
				this.isDisabled = false;
				// this.profilePhotoUrl = res.url;
				// this.profilePhotoName = res.path;

				this.addPhoto(res.path);
				this.uploadPhoto(res.data.url, res.data['fields'], this.file);
			});
	}

	private uploadPhoto(url, fields, file) {
        console.log(url)
        console.log(file)
		let formData: FormData = new FormData();
		Object.keys(fields).forEach(key => {
            formData.append(key, fields[key]);
            console.log(key, fields[key])
        });
        formData.append('file', file);
        console.log(formData);
		// Post formdata with file and authorization to S3
		return this.http.post(url, formData).subscribe(
			res => {
				console.log('file posted to S3', file.name);
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
