import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { RecipeDetail } from 'src/app/core/models';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
	constructor(private fb: FormBuilder) {}

	recipeForm: FormGroup;

	ngOnInit() {
		this.recipeForm = this.createRecipeForm();
	}

	createRecipeForm() {
		const form = this.fb.group({
			title: [],
			recipe_ingredients: this.fb.array([
				this.fb.group({
					ingredient: [],
					quantity_amount: [],
					quantity_unit: [],
				}),
			]),
			recipe_steps: this.fb.array([
				this.fb.group({
					step_number: [],
					step_text: [],
				}),
			]),
			recipe_notes: this.fb.array([
				this.fb.group({
					note_text: [],
				}),
			]),
		});

		return form;
	}

	get recipeIngredients() {
		return this.recipeForm.get('recipe_ingredients') as FormArray;
	}
	get recipeSteps() {
		return this.recipeForm.get('recipe_steps') as FormArray;
	}
	get recipeNotes() {
		return this.recipeForm.get('recipe_notes') as FormArray;
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

	deleteRecipeIngredient(index) {
		this.recipeIngredients.removeAt(index);
	}

	deleteRecipeStep(index) {
		this.recipeSteps.removeAt(index);
	}
}
