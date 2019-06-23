import {
	Component,
	ViewChild,
	OnInit,
	ElementRef,
	OnDestroy,
	AfterViewInit,
} from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import {
	MatChipInputEvent,
	MatAutocomplete,
	MatAutocompleteSelectedEvent,
} from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, map, tap, takeUntil } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-recipe-chips',
	templateUrl: './recipe-chips.component.html',
	styleUrls: ['./recipe-chips.component.css'],
})
export class FormlyChipsComponent extends FieldType
	implements OnInit, OnDestroy, AfterViewInit {
	onDestroy$ = new Subject<void>();

	itemControl = new FormControl();
	selectable = true;
	removable = true;
	addOnBlur = true;
	separatorKeysCodes: number[] = [ENTER, COMMA];

	@ViewChild('auto') matAutocomplete: MatAutocomplete;

	filter: Observable<any[]>;

	ngOnInit() {
		super.ngOnInit();

		this.filter = this.itemControl.valueChanges.pipe(
			takeUntil(this.onDestroy$),
			startWith(null),
			map((item: any | null) =>
				item ? this._filter(item) : this._filter('')
			)
		);
	}

	ngAfterViewInit() {
		super.ngAfterViewInit();
		// temporary fix for https://github.com/angular/material2/issues/6728
		(<any>this.matAutocomplete)._formField = this.formField;
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	get empty() {
		return this.formControl.value.length === 0;
	}

	public add(event: MatChipInputEvent): void {
		// Add item only when MatAutocomplete is not open
		// To make sure this does not conflict with OptionSelected Event
		if (!this.matAutocomplete.isOpen) {
			const input = event.input;
			const value = event.value;

			// Add item
			if ((value || '').trim()) {
				this.formControl.setValue([
					...this.formControl.value,
					value.trim(),
				]);
			}

			// Reset the input value
			if (input) {
				input.value = '';
			}

			this.itemControl.setValue(null);
		}
	}

	public selected(event: MatAutocompleteSelectedEvent): void {
		this.formControl.setValue([
			...this.formControl.value,
			event.option.viewValue,
		]);

		this.itemControl.setValue(null);
	}

	public remove(i: number): void {
		const value = this.formControl.value;

		this.formControl.setValue([
			...value.slice(0, i),
			...value.slice(i + 1, value.length),
		]);
		this.formControl.markAsTouched();
	}

	private _filter(value: any): any[] {
		if (!this.to.filter) return [];
		if (!value) return this.to.filter.slice();

		const filterValue = value.toLowerCase();

		return this.to.filter.filter(
			item => item.toLowerCase().indexOf(filterValue) === 0
		);
	}

	onBlur() {
		this.formControl.markAsTouched();
		this.field.focus = false;
	}
}
