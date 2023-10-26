import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DemoMaterialModule} from './material-module';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'menu', component: FoodMenuComponent },
  { path: 'dummy', component: DummyComponent },
];
import { SideNavComponent } from './side-nav/side-nav.component';
import { OverlayComponent } from './overlay/overlay.component';
import { SidebarsService } from './sidebars.service';
import { DummyComponent } from './dummy/dummy.component';
import { WindowService } from './window.service';

@NgModule({
 declarations: [
    DummyComponent,
    OverlayComponent,
    SideNavComponent,
    FoodMenuComponent,
    AppComponent,
    TopNavComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
  ],


providers: [
    WindowService,
    SidebarsService,],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
