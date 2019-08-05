import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { User, Errors } from 'src/app/core/models';
import { AlertService } from 'src/app/core/services/alert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	isSubmitted = false;
	loginForm: FormGroup;
	errors: Errors = { errors: {} };

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userAuthService: UserAuthService,
		private fb: FormBuilder,
		private alertService: ToastrService
	) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	get formControls() {
		return this.loginForm.controls;
	}

	login() {
		this.isSubmitted = true;
		const credentials = this.loginForm.value;
		this.userAuthService.attemptAuth(credentials).subscribe(
			data => {
				this.alertService.success('Logged in successfully!');
				this.router.navigateByUrl('/');
			},
			err => {
				this.alertService.error(err);
				this.isSubmitted = false;
			}
		);
	}
}
