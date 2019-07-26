import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-sandbox',
	templateUrl: './sandbox.component.html',
	styleUrls: ['./sandbox.component.css'],
})
export class SandboxComponent implements OnInit {
	constructor(private toastr: ToastrService) {}

	ngOnInit() {}

	updateArray(photoArray) {
		console.log(photoArray);
	}

	toast() {
		this.toastr.success('Toast has been triggered!');
	}
}
