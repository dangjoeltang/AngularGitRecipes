export interface ProfileData {
	id: number;
	user_account: string;
	first_name: string;
	last_name: string;
	profile_photo: File;
	short_bio: string;
	recipe_count: number;
	author_recipes: string[];
	created_time: string;
}
