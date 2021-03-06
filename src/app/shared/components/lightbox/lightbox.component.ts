import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-lightbox',
	templateUrl: './lightbox.component.html',
	styleUrls: ['./lightbox.component.scss'],
})
export class LightboxComponent implements OnInit {
	@Input() photosArray: string[];

	private closeResult: string;
	private modalData;

	constructor(private modalService: NgbModal) {}

	ngOnInit() {}

	openModal(content, data) {
		const modalRef = this.modalService.open(content, {
			size: 'lg',
		});
		// const modalRef = this.modalService.open(ImgModalComponent, {
		//     windowClass: 'center',
		// });
		this.modalData = data;
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
