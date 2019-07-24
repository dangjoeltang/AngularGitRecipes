import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormArray,
	FormControl,
	Validators,
} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AlertService } from 'src/app/core/services/alert.service';

const URL = 'https://httpbin.org/post';

@Component({
	selector: 'app-multi-img-uploader',
	templateUrl: './multi-img-uploader.component.html',
	styleUrls: ['./multi-img-uploader.component.css'],
})
export class MultiImgUploaderComponent implements OnInit {
	private apiUrl = environment.api_url;
	private photos = [];
	private photoForm: FormGroup;
	private form;
	private file;
	private multiple = true;

	private signedRes;
	private imageSrc = [];
	private profilePhotoUrl: string;
	private profilePhotoName: string;
	private isDisabled: boolean = true;

	public uploader: FileUploader = new FileUploader({ url: URL });

	constructor(
		private fb: FormBuilder,
		private api: ApiService,
		private http: HttpClient,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.photoForm = this.createPhotoForm();
	}

	onUploadError(event) {
		console.log(event);
	}
	onUploadSuccess(event) {
		console.log(event);
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

	private addPhoto(event) {
		this.photosArray.push(
			this.fb.group({
				photo_file: [],
			})
		);
		console.log(this.photosArray.value);
		console.log(event.target.files);
	}

	private removePhoto(index) {
		this.photosArray.removeAt(index);
	}

	private onFileSelect(file) {
		// this.addPhoto(file.target.files[0].name);
		if (file.target.files && file.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (event: any) => {
				this.imageSrc.push(event.target.result);
			};
			reader.readAsDataURL(file.target.files[0]);
		}

		this.file = file.target.files[0];
		console.log(this.file);
		console.log(this.imageSrc);
		const file_name = 'recipe-photos/' + file.target.files[0].name;
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
				console.log(res);
				this.profilePhotoUrl = res.url;
				this.profilePhotoName = res.path;

				this.photosArray.push(
					this.fb.group({
						photo_file: [res.path],
					})
				);
				console.log(this.photosArray.value);
			});
	}
}
