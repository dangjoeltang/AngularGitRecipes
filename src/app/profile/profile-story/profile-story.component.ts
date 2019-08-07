import { Component, OnInit, Input } from '@angular/core';

import { ProfileService } from 'src/app/core/services/profile.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { ProfileData } from 'src/app/core/models/profile.model';

import {
	NgbModal,
	NgbActiveModal,
	ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-profile-story',
	templateUrl: './profile-story.component.html',
	styleUrls: ['./profile-story.component.scss'],
})
export class ProfileStoryComponent implements OnInit {
	@Input() profile: ProfileData;

	private closeResult: string;

	constructor(private modalService: NgbModal) {}

	ngOnInit() {
		// console.log(this.profile);
	}

	openModal(content) {
		const modalRef = this.modalService.open(content, {
			// size: 'sm',
		});
		// const modalRef = this.modalService.open(ImgModalComponent, {
		//     windowClass: 'center',
		// });
		// this.modalData = data;
		modalRef.result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
