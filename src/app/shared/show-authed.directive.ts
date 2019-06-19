import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';

import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Directive({ selector: '[showAuthed]' })
export class ShowAuthedDirective implements OnInit {
	constructor(
		private templateRef: TemplateRef<any>,
		private userService: UserAuthService,
		private viewContainer: ViewContainerRef
	) {}

	condition: boolean;

	ngOnInit() {
		this.userService.isAuthenticated.subscribe(authed => {
			console.log(authed && this.condition);
			if ((authed && this.condition) || (!authed && this.condition)) {
				this.viewContainer.createEmbeddedView(this.templateRef);
			} else {
				this.viewContainer.clear();
			}
		});
	}

	@Input() set showAuthed(condition: boolean) {
		this.condition = condition;
	}
}
