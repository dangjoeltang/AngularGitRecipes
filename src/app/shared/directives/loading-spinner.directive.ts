import {
	Directive,
	TemplateRef,
	ViewContainerRef,
	ComponentFactoryResolver,
	Input,
	ComponentRef,
	ComponentFactory,
} from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Directive({
	selector: '[showLoadingSpinner]',
})
export class LoadingSpinnerDirective {
	spinnerFactory: ComponentFactory<SpinnerComponent>;
	spinnerComponent: ComponentRef<SpinnerComponent>;

	@Input()
	set showLoadingSpinner(loading: boolean) {
		this.vcRef.clear();

		if (loading) {
			this.spinnerComponent = this.vcRef.createComponent(
				this.spinnerFactory
			);
		} else {
			this.vcRef.createEmbeddedView;
		}
	}

	constructor(
		private tempRef: TemplateRef<any>,
		private vcRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		this.spinnerFactory = this.componentFactoryResolver.resolveComponentFactory(
			SpinnerComponent
		);
	}
}
