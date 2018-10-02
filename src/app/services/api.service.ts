import { Injectable } from '@angular/core';
import { getSampleCampaigns } from './sample';
import { of, Observable, ReplaySubject, Subject } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { Campaigns, Campaign } from '../models/campaign.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public selectedCampaign$ = new ReplaySubject<Campaign>(1);
  public campaignList$ = new ReplaySubject<Campaigns>(1);

  constructor(
    private authSvc: AuthService
  ) {
    this.campaignList$.next(getSampleCampaigns(20));
  }

  addCampaign(title: string) {
    const campaign = new Campaign(title, this.authSvc.getUser());
    this.campaignList$.pipe(
      take(1),
      ).subscribe(list => {
        const newList = [campaign, ...list];
        this.campaignList$.next(newList);
        this.selectedCampaign$.next(campaign);
      });
  }
}
