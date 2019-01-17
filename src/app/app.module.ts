// Angular
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
// Components
import { AppComponent } from './app.component';
import { MainPageComponent } from './containers/main-page-container/main-page.component';
import { WelcomePageComponent } from './containers/welcome-page-container/welcome-page.component';
import { UserSettingsComponent } from './components/user-settings-component/user-settings.component';
import { SettingsPopupComponent } from './components/settings-popup/settings-popup.component';
import { ImageComponent } from './components/image-component/image.component';
import { LoaderComponent } from './components/loader-component/loader.component';
import { LocationsListComponent } from './components/locations-list-component/locations-list.component';
import { WeatherNavSliderComponent } from './components/weather-nav-slider-component/weather-nav-slider.component';
import { HeaderNavComponent } from './components/header-nav-component/header-nav.component';
import { PopupComponent } from './components/popup-component/popup.component';
// Reducers
import { dataReducer } from './reducers/data.reducer';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'welcome-page', component: WelcomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    WelcomePageComponent,
    UserSettingsComponent,
    SettingsPopupComponent,
    LocationsListComponent,
    ImageComponent,
    LoaderComponent,
    WeatherNavSliderComponent,
    HeaderNavComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    StoreModule.forRoot({data: dataReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
