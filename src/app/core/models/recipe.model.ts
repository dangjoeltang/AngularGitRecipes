export interface RecipeDetail {
	id: string;
	title: string;
	author: string;
	ingredients: {
		[key: string]: Ingredient;
	};
	tags: {
		[key: string]: Tag;
	};
	steps: {
		[key: string]: Step;
	};
	notes: {
		[key: string]: Note;
	};
	created_time: string;
	modified_time: string;
}

export interface Ingredient {
	id: string;
	item: string;
	amount: string;
	unit: string;
}

export interface Tag {
	id: string;
	text: string;
}

export interface Step {
	number: number;
	text: string;
}

export interface Note {
	text: string;
}
