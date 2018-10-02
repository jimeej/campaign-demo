import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { CampaignsListComponent } from './components/campaigns-list/campaigns-list.component';
import { CampaignsHistoryComponent } from './components/campaigns-history/campaigns-history.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignsListComponent,
    CampaignsHistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
