export interface RecipeDetail {
	pk: number;
	title: string;
	author: number;
	privacy: string;
	description: string;
	recipe_photos: Photo[];
	ingredients: Ingredient[];
	tags: string[];
	steps: Step[];
	notes: Note[];
	created_time: string;
	modified_time: string;
}

export interface Ingredient {
	ingredient: string;
	quantity_amount: string;
	quantity_unit: string;
}

export interface Step {
	step_number: number;
	step_text: string;
}

export interface Note {
	note_text: string;
}

export interface Photo {
	photo_text: string;
	photo_file: any;
}
