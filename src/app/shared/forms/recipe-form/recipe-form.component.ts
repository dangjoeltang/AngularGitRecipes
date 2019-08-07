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
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { environment } from 'src/environments/environment';
import { Subject, ReplaySubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
	@Input() recipe: RecipeDetail;

	constructor(
		private fb: FormBuilder,
		private recipeService: RecipeService,
		private alertService: ToastrService,
		private router: Router,
		private userService: UserAuthService,
		private route: ActivatedRoute
	) {}

	// 'https://dcrfk60sixql7.cloudfront.net'
	private mediaUrl = environment.media_url;

	photoEventsSubject = new ReplaySubject();

	recipeForm: FormGroup;
	form;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
	removable: boolean = true;
	user = this.userService.currentUserValue;
	submitted = false;

	private imageSrcP: string[] = [];
	private photosArrayP: string[] = [];

	tags = [];
	privacies = ['Public', 'Private', 'Secret'];

	ngOnInit() {
		this.recipeForm = this.createRecipeForm();
		if (this.recipe) {
			// If recipe is passed as input, prefill the form
			this.patchData(this.recipe);
		}

		this.userService.currentUser.subscribe(res => {
			this.recipeForm.controls.author.setValue(res.profile_id);
		});
		// const directions = this.recipeForm.get('steps');
		// directions.valueChanges.subscribe(val => {})
	}

	emitEventToChild(data) {
		this.photoEventsSubject.next(data);
	}

	patchData(recipe: RecipeDetail) {
		this.recipeForm.patchValue({ title: recipe.title });
		this.recipeForm.patchValue({ author: recipe.author });
		this.recipeForm.patchValue({ tags: recipe.tags });
		this.recipeForm.patchValue({ description: recipe.description });
		this.recipeForm.patchValue({ privacy: recipe.privacy });

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

		let photoNames = recipe.recipe_photos.map(p => p.photo_file);
		this.emitEventToChild(photoNames);
	}

	createRecipeForm() {
		this.form = this.fb.group({
			title: [''],
			author: this.user.profile_id,
			tags: [[]],
			description: [''],
			privacy: [this.privacies[0]],
			recipe_photos: [[]],
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
	get recipePhotos() {
		return this.recipeForm.get('recipe_photos') as FormArray;
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

	updatePhotos(event) {
		let faPhotos = [];
		event.forEach(photoName => {
			let temp = {
				photo_file: photoName,
				photo_text: '',
			};
			faPhotos.push(temp);
		});
		this.recipeForm.patchValue({ recipe_photos: faPhotos });
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

	deleteRecipePhoto(index) {
		this.recipePhotos.removeAt(index);
	}

	submitRecipe() {
		this.submitted = true;

		if (this.recipeForm.invalid) {
			this.alertService.error(
				'Please double check to make sure no fields are empty.'
			);
			return;
		}

		// this.recipeForm.value.tags.forEach(tag => {
		// 	tag = tag.toLowerCase();
		// 	console.log(tag);
		// });

		this.route.params.subscribe(res => {
			if (res.recipe_id) {
				console.log('Updating recipe');
				this.recipeForm.addControl(
					'pk',
					new FormControl(res.recipe_id)
				);
				const recipe: RecipeDetail = this.recipeForm.value;
				this.recipeService
					.updateRecipe(res.recipe_id, recipe)
					.subscribe(
						res => {
							this.alertService.success(`${res.title} updated!`);
							this.router.navigateByUrl(`/recipes/${res.pk}`);
						},
						err => {
							this.alertService.error(err);
						}
					);
			} else {
				// console.log('Creating new recipe');
				// console.log(this.recipeForm.value);
				const recipe: RecipeDetail = this.recipeForm.value;
				this.recipeService.createNewRecipe(recipe).subscribe(
					res => {
						this.alertService.success(
							`${res.title} created successfully!`
						);
						this.router.navigateByUrl(`/recipes/${res.pk}`);
					},
					err => {
						this.alertService.error(err);
						console.log(err);
					}
				);
			}
		});
	}
}
