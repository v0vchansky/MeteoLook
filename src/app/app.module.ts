// Angular
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
// Components
import { AppComponent } from './app.component';
import { MainPageComponent } from './containers/main-page-container/main-page.component';
import { ImageComponent } from './components/image-component/image.component';
import { LoaderComponent } from './components/loader-component/loader.component';
import { WeatherNavSliderComponent } from './components/weather-nav-slider-component/weather-nav-slider.component';
import { HeaderNavComponent } from './components/header-nav-component/header-nav.component';
import { PopupComponent } from './components/popup-component/popup.component';
// Reducers
import { dataReducer } from './reducers/data.reducer';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
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
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({data: dataReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
