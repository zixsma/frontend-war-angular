import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PoorEnemyDashboardComponent } from './poor-enemy-dashboard/poor-enemy-dashboard.component';
import { GithubService } from './github-service/github.service';
import { StargazersComponent } from './stargazers/stargazers.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PoorEnemyDashboardComponent,
    StargazersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
