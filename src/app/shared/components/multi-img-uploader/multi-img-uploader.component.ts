import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormArray,
	FormControl,
	Validators,
} from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
	selector: 'app-multi-img-uploader',
	templateUrl: './multi-img-uploader.component.html',
	styleUrls: ['./multi-img-uploader.component.css'],
})
export class MultiImgUploaderComponent implements OnInit {
	private config: DropzoneConfigInterface = {
		url: 'https://httpbin.org/post',
		maxFilesize: 50,
		acceptedFiles: 'image/*',
	};
	private photos = [];
	private photoForm: FormGroup;
	private form;

	constructor(private fb: FormBuilder) {}

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

	private addPhoto() {
		this.photosArray.push(
			this.fb.group({
				photo_file: [],
			})
		);
		console.log(this.photosArray.value);
	}

	private removePhoto(index) {
		this.photosArray.removeAt(index);
	}
}
