import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaigns-history',
  templateUrl: './campaigns-history.component.html',
  styleUrls: ['./campaigns-history.component.css']
})
export class CampaignsHistoryComponent implements OnInit {
  selectedCampaign: Campaign;

  constructor(
    private apiSvc: ApiService
  ) { }

  ngOnInit() {
    this.apiSvc.selectedCampaign$.subscribe((data) => {
      this.selectedCampaign = data;
    });
  }

}
