import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
	recipeForm = new FormGroup({});
	model: any = {};
	options: FormlyFormOptions = {};

	fields: FormlyFieldConfig[] = [
		{
			key: 'recipe',
			fieldGroup: [
				{
					key: 'title',
					type: 'input',
					templateOptions: {
						required: true,
						label: 'Recipe Title',
					},
				},
				{
					key: 'author',
					type: 'input',
					defaultValue: 'defaultUser',
					templateOptions: {
						required: true,
						label: 'Author',
					},
				},
				{
					key: 'tags',
					type: 'chips',
					// defaultValue: [],
					templateOptions: {
						label: 'Tags',
						required: false,
					},
				},
			],
		},
	];

	constructor() {}

	ngOnInit() {}

	submit() {
		console.log(JSON.stringify(this.model));
	}
}
