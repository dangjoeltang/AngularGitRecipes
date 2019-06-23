import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
	recipeForm = new FormGroup({});
	model: any = {};
	options: FormlyFormOptions = {};

	constructor(
		private recipeService: RecipeService,
		private router: Router,
		private alertService: AlertService
	) {}

	fields: FormlyFieldConfig[] = [
		// {
		// 	key: 'recipe',
		// 	fieldGroup: [
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
			templateOptions: {
				label: 'Tags',
				required: false,
			},
		},
		// 	],
		// },
	];

	ngOnInit() {}

	submit() {
		console.log(JSON.stringify(this.model));
		this.recipeService.createNewRecipe(this.model).subscribe(res => {
			this.alertService.success(`Recipe ${res.title} created`, true);
			this.router.navigateByUrl(`/recipes/${res.pk}`);
		});
	}
}
