import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatTableModule, MatCheckboxModule, MatDialogModule, MatGridListModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { PhotoOverviewComponent } from './photo-overview/photo-overview.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserListComponent,
    PhotoOverviewComponent
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatGridListModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoOverviewComponent]

})
export class AppModule { }
