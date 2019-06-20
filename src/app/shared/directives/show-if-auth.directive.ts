import {
	Directive,
	TemplateRef,
	ViewContainerRef,
	OnInit,
	Input,
} from '@angular/core';
import { UserAuthService } from '../../core/services/user-auth.service';

@Directive({
	selector: '[showIfAuth]',
})
export class ShowIfAuthDirective implements OnInit {
	condition: boolean;
	@Input() set showIfAuth(condition: boolean) {
		this.condition = condition;
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private userService: UserAuthService,
		private viewContainer: ViewContainerRef
	) {}

	ngOnInit() {
		this.userService.isAuthenticated.subscribe(authed => {
			if ((authed && this.condition) || (!authed && !this.condition)) {
				this.viewContainer.createEmbeddedView(this.templateRef);
			} else {
				this.viewContainer.clear();
			}
		});
	}
}
