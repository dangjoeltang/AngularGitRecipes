import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Errors } from 'src/app/core/models';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	isSubmitted = false;
	registerForm: FormGroup;
	errors: Errors = { errors: {} };
	showPassword: boolean = false;

	constructor(
		private router: Router,
		private userAuthService: UserAuthService,
		private fb: FormBuilder,
		private alertService: ToastrService
	) {}

	ngOnInit() {
		this.registerForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			username: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(8)]],
		});
	}

	get f() {
		return this.registerForm.controls;
	}

	togglePassword() {
		this.showPassword = !this.showPassword;
	}

	register() {
		this.isSubmitted = true;

		if (this.registerForm.invalid) {
			return;
		}

		const formData = this.registerForm.value;
		this.userAuthService.registerAuth(formData).subscribe(
			res => {
				this.alertService.success('Successfully created an account!');
				this.router.navigateByUrl('/auth/login');
			},
			err => {
				console.log(err);
				this.errors = err;
				this.alertService.error(err.details);
				this.isSubmitted = false;
			}
		);
	}
}
