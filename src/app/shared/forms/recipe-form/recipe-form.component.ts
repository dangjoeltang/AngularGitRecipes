import { Component, OnInit, Input } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormArray,
	FormControl,
	Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
	@Input() recipe: RecipeDetail;

	constructor(
		private fb: FormBuilder,
		private recipeService: RecipeService,
		private alertService: AlertService,
		private router: Router,
		private userService: UserAuthService,
		private route: ActivatedRoute
	) {}

	recipeForm: FormGroup;
	form;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
	removable: boolean = true;
	user = this.userService.currentUserValue;
	submitted = false;

	tags = [];

	ngOnInit() {
		this.recipeForm = this.createRecipeForm();
		if (this.recipe) {
			// If recipe is passed as input, prefill the form
			this.patchData(this.recipe);
		}
		// const directions = this.recipeForm.get('steps');
		// directions.valueChanges.subscribe(val => {})
	}

	patchData(recipe: RecipeDetail) {
		this.recipeForm.patchValue({ title: recipe.title });
		this.recipeForm.patchValue({ author: recipe.author });
		this.recipeForm.patchValue({ tags: recipe.tags });

		const faIngredients = <FormArray>this.recipeForm.controls.ingredients;
		recipe.ingredients.forEach(ing => {
			let temp: FormGroup = this.fb.group({
				ingredient: [ing.ingredient],
				quantity_amount: [ing.quantity_amount],
				quantity_unit: [ing.quantity_unit],
			});
			temp.patchValue(ing);
			faIngredients.push(temp);
		});

		const faSteps = <FormArray>this.recipeForm.controls.steps;
		recipe.steps.forEach(step => {
			let temp: FormGroup = this.fb.group({
				step_number: [step.step_number],
				step_text: [step.step_text],
			});
			temp.patchValue(step);
			faSteps.push(temp);
		});

		const faNotes = <FormArray>this.recipeForm.controls.notes;
		recipe.notes.forEach(note => {
			let temp: FormGroup = this.fb.group({
				note_text: [note.note_text],
			});
			temp.patchValue(note);
			faNotes.push(temp);
		});
	}

	createRecipeForm() {
		this.form = this.fb.group({
			title: [],
			author: this.user.profile_id,
			tags: [],
			ingredients: this.fb.array([
				// this.fb.group({
				// 	ingredient: [],
				// 	quantity_amount: [],
				// 	quantity_unit: [],
				// }),
			]),
			steps: this.fb.array([
				// this.fb.group({
				// 	step_number: [],
				// 	step_text: [],
				// }),
			]),
			notes: this.fb.array([
				// this.fb.group({
				// 	note_text: [],
				// }),
			]),
		});

		return this.form;
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
				ingredient: ['', Validators.required],
				quantity_amount: ['', Validators.required],
				quantity_unit: ['', Validators.required],
			})
		);
	}

	addRecipeStep() {
		this.recipeSteps.push(
			this.fb.group({
				step_number: [
					this.form.value.steps.length + 1,
					Validators.required,
				],
				step_text: ['', Validators.required],
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
		this.form.value.steps.forEach((step, i) => {
			step.step_number = i + 1;
		});
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
		this.submitted = true;

		if (this.recipeForm.invalid) {
			this.alertService.error(
				'Please double check to make sure no fields are empty.'
			);
			return;
		}

		this.route.params.subscribe(res => {
			if (res.recipe_id) {
				console.log('Updating recipe');
				this.recipeForm.addControl(
					'pk',
					new FormControl(res.recipe_id)
				);
				const recipe: RecipeDetail = this.recipeForm.value;
				console.log(recipe);
				this.recipeService
					.updateRecipe(res.recipe_id, recipe)
					.subscribe(
						res => {
							this.alertService.success(
								`${res.title} updated!`,
								true
							);
							this.router.navigateByUrl(`/recipes/${res.pk}`);
						},
						err => {
							this.alertService.error(err, true);
						}
					);
			} else {
				console.log('Creating new recipe');
				const recipe: RecipeDetail = this.recipeForm.value;
				this.recipeService.createNewRecipe(recipe).subscribe(
					res => {
						this.alertService.success(
							`${res.title} created successfully!`,
							true
						);
						this.router.navigateByUrl(`/recipes/${res.pk}`);
					},
					err => {
						this.alertService.error(err, true);
					}
				);
			}
		});
	}

	createRecipe() {}

	updateRecipe() {}
}
