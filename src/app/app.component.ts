import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from './services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newCampaignTitle: string;
  modalRef: BsModalRef;
  constructor(
    private apiSvc: ApiService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  createNewCampaign() {
    this.modalRef.hide();
    this.apiSvc.addCampaign(this.newCampaignTitle);
    this.newCampaignTitle = '';
  }

  cancelCampaignCreation() {
    this.newCampaignTitle = '';
    this.modalRef.hide();
  }
}
