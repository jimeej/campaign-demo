import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Campaigns, Campaign } from '../../models/campaign.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

type modeType = 'view' | 'comment' | 'rename';

class CampaignDisplay {
  public mode: modeType = 'view';
  public renameInput = '';
  public commentInput = '';
  public isSelected = false;
  constructor(public data: Campaign) {
    this.renameInput = data.title;
  }
}

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.css']
})
export class CampaignsListComponent implements OnInit {
  campaignDisplayList: CampaignDisplay[] = [];
  authUser: User;

  constructor(private apiSvc: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.authUser = this.authService.getUser();
    this.apiSvc.campaignList$.subscribe(data => {
      this.campaignDisplayList = data
        .filter(u => !u.isArchived)
        .map(u => new CampaignDisplay(u));
    });

    this.apiSvc.selectedCampaign$.subscribe(campaign => {
      (this.campaignDisplayList || []).forEach(u => {
        if (u.data.id === campaign.id) {
          u.isSelected = true;
        } else {
          u.isSelected = false;
        }
      });
    });
  }

  setAsActive(campaign: CampaignDisplay) {
    this.apiSvc.selectedCampaign$.next(campaign.data);
  }

  changeMode(campaign: CampaignDisplay, mode: modeType) {
    console.log(campaign, mode);
    this.campaignDisplayList.forEach(unit => unit.mode = 'view');
    campaign.mode = mode;
  }

  toggleActiveCampaign(campaign: CampaignDisplay) {
    if (campaign.data.isActive) {
      campaign.data.pauseCampaign(this.authUser);
    } else {
      campaign.data.resumeCampaign(this.authUser);
    }
  }

  addComment(campaign: CampaignDisplay) {
    campaign.data.addComment(campaign.commentInput, this.authUser);
    campaign.commentInput = '';
    campaign.mode = 'view';
  }

  editCampaignName(campaign: CampaignDisplay) {
    campaign.data.renameCampaign(campaign.renameInput, this.authUser);
    campaign.mode = 'view';
  }

  removeCampaign(campaign: CampaignDisplay) {
    campaign.data.deleteCampaign(this.authUser);
    this.campaignDisplayList = this.campaignDisplayList.filter(
      u => !u.data.isArchived
    );
  }
}
