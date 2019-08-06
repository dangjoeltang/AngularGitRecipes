import {
	Directive,
	ElementRef,
	TemplateRef,
	ViewContainerRef,
	OnInit,
	Input,
} from '@angular/core';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Directive({
	selector: '[showEdit]',
})
export class ShowEditDirective implements OnInit {
	private currentUser;
	private objOwner;

	@Input()
	set showEdit(val) {
		this.objOwner = val;
		this.updateView();
	}

	constructor(
		private userService: UserAuthService,
		private element: ElementRef,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) {}

	ngOnInit() {
		this.currentUser = JSON.parse(localStorage.getItem('user'));
		console.log(this.currentUser);
		this.updateView();
	}

	private updateView() {
		if (this.checkPermission()) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		} else {
			this.viewContainer.clear();
		}
	}

	private checkPermission() {
		let hasPermission = false;
		if (this.currentUser['profile_id'] == this.objOwner) {
			hasPermission = true;
		}

		return hasPermission;
	}
}
