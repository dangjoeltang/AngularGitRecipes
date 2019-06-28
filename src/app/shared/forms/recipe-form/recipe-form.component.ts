import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';

import { RecipeDetail } from 'src/app/core/models';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private recipeService: RecipeService,
		private alertService: AlertService,
		private router: Router,
		private userService: UserAuthService
	) {}

	recipeForm: FormGroup;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
	removable: boolean = true;
	user = this.userService.currentUserValue;

	tags = [];

	ngOnInit() {
		this.recipeForm = this.createRecipeForm();
	}

	createRecipeForm() {
		const form = this.fb.group({
			title: [],
			author: this.user.profile_id,
			tags: [],
			ingredients: this.fb.array([
				this.fb.group({
					ingredient: [],
					quantity_amount: [],
					quantity_unit: [],
				}),
			]),
			steps: this.fb.array([
				this.fb.group({
					step_number: [],
					step_text: [],
				}),
			]),
			notes: this.fb.array([
				this.fb.group({
					note_text: [],
				}),
			]),
		});

		return form;
	}

	get recipeIngredients() {
		return this.recipeForm.get('ingredients') as FormArray;
	}
	get recipeSteps() {
		return this.recipeForm.get('steps') as FormArray;
	}
	get recipeNotes() {
		return this.recipeForm.get('notes') as FormArray;
	}

	addRecipeIngredient() {
		this.recipeIngredients.push(
			this.fb.group({
				ingredient: [],
				quantity_amount: [],
				quantity_unit: [],
			})
		);
	}

	addRecipeStep() {
		this.recipeSteps.push(
			this.fb.group({
				step_number: [],
				step_text: [],
			})
		);
	}

	addRecipeNote() {
		this.recipeNotes.push(
			this.fb.group({
				note_text: [],
			})
		);
	}

	deleteRecipeIngredient(index) {
		this.recipeIngredients.removeAt(index);
	}

	deleteRecipeStep(index) {
		this.recipeSteps.removeAt(index);
	}

	deleteRecipeNote(index) {
		this.recipeNotes.removeAt(index);
	}

	// onAdding(event) {
	// 	const input = event.input;
	// 	const value = event.value;
	// 	if (value.trim() !== '') {
	// 		this.tags.push(value);
	// 		// this.recipeForm.controls['tags'].markAsDirty();
	// 		input.value = '';
	// 	}
	// }

	submitRecipe() {
		const recipe: RecipeDetail = this.recipeForm.value;
		console.log(recipe);
		this.recipeService.createNewRecipe(recipe).subscribe(res => {
			this.alertService.success(
				`${res.title} created successfully!`,
				true
			);
			this.router.navigateByUrl(`/recipes/${res.pk}`);
		});
	}
}
