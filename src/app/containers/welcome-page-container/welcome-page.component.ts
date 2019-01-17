// Angular
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
// Actions
import { GetData, SetUserInfo } from '../../actions/data.action';
// Models
import { AppState } from '../../app.state';
// Services
import { GetService } from '../../services/get.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'ml-welcome-page',
  templateUrl: './welcome-page.template.html',
  styleUrls: ['./welcome-page.style.css'],
  providers: [GetService, ValidatorService]
})

export class WelcomePageComponent {

  popupIsClosed: boolean;
  popupData: any;
  data: any = [];
  popUpType: string;
  searchString: string;
  isLoading: boolean;
  sex: string;
  formErrors: any;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private GetService: GetService,
    private ValidatorService: ValidatorService,
  ) {
    this.searchString = "";
    this.popupIsClosed = true;
    this.isLoading = false;
  }

  submitSettingsForm(data) {
    let errors = this.ValidatorService.settingsValidator(data);
    if (errors.length != 0) {
      this.popupIsClosed = true;
      this.formErrors = errors;
    } else {
      this.formErrors = [];
      this.sex = data.sex;
      this.popupIsClosed = false;
      this.GetService.getGeoLocation(data.geoLocation).subscribe((data) => {
        this.popupData = data;
        this.popUpType = "locations";
      });
    }
  }

  closePopup() {
    this.popupIsClosed = true;
  }

  addUserLocation(i) {
    let data = this.popupData[i];
    this.store.dispatch(new SetUserInfo({
      geoLocation: data.display_name,
      lat: data.lat,
      lon: data.lon,
      sex: this.sex
    }));
    this.GetService.get(this.sex, data.lat, data.lon).subscribe(data => {
      this.store.dispatch(new GetData(JSON.stringify(data)));
      this.router.navigateByUrl('main-page').then();
    });
  }
}
