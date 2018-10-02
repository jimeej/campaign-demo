import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsHistoryComponent } from './campaigns-history.component';

describe('CampaignsHistoryComponent', () => {
  let component: CampaignsHistoryComponent;
  let fixture: ComponentFixture<CampaignsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
