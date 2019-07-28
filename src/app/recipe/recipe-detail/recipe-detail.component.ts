import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDetail, User } from 'src/app/core/models';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
	private recipe_id;
	private recipe: RecipeDetail;
	private closeResult: string;
	private currentUser: User;
	private mediaUrl = environment.media_url;
	private imageUrls: string[];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private modalService: NgbModal,
		private recipeService: RecipeService,
		private alertService: AlertService,
		private userService: UserAuthService
	) {}

	ngOnInit() {
		this.route.data.subscribe((data: { recipe: RecipeDetail }) => {
			this.recipe = data.recipe;
			// console.log(this.route);
			// console.log(this.recipe);
		});
		this.userService.currentUser.subscribe(userData => {
			this.currentUser = userData;
		});
		this.imageUrls = this.recipe.recipe_photos.map(
			pName => `${this.mediaUrl}/${pName.photo_file}`
		);
		console.log(this.imageUrls);
	}

	deleteRecipe() {
		this.recipeService.deleteRecipe(this.recipe.pk).subscribe(res => {
			this.modalService.dismissAll();
			this.alertService.success('Deleted recipe', true);
			this.router.navigate(['/profile', this.currentUser.profile_id]);
		});
	}

	open(content) {
		this.modalService
			.open(content, { ariaLabelledBy: 'modal-basic-title' })
			.result.then(
				result => {
					this.closeResult = `Closed with: ${result}`;
				},
				reason => {
					this.closeResult = `Dismissed ${this.getDismissReason(
						reason
					)}`;
				}
			);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
