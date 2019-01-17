// Angular
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
// Models
import { serverData } from '../../models/serverData.model';
import { AppState } from '../../app.state';
import { User } from '../../models/user.model';
// Services
import { GetService } from '../../services/get.service';
import { ValidatorService } from '../../services/validator.service';
import {GetData, SetSettings, SetUserInfo} from '../../actions/data.action';

@Component({
  selector: 'ml-main-page',
  templateUrl: './main-page.template.html',
  styleUrls: ['./main-page.style.css'],
  providers: [GetService, ValidatorService]
})

export class MainPageComponent implements OnInit {

  data: serverData[];
  user: User;
  sex: string;
  dateId: number;
  isLoading: boolean = true;
  itemWidth: number;
  imageHeight: number;

  popupIsClosed: boolean = true;
  popupData: any;

  settingsPopUpIsClosed: boolean = true;
  settingsPopUpData: any = [];
  formErrors: any;

  isAnotherLocation: boolean = false;
  geoName: string;
  searchString: string;
  backButton: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private GetService: GetService,
    private ValidatorService: ValidatorService,
  ) {}

  ngOnInit(): void {
    this.backButton = 'hidden';
    this.store.select('data').subscribe(({data, isLoading, user}) => {
      console.log(data, isLoading);
      this.isLoading = isLoading;
      this.data = data;
      this.user = user;
      this.geoName = user.geoLocation;
      this.dateId = 0;
      this.isLoading = false
    });
    this.itemWidth = document.documentElement.clientWidth / 3;
    this.imageHeight = document.documentElement.clientHeight - 220;
  }

  addAnotherLocation(i) {
    this.closePopup();
    this.isLoading = true;
    if (!this.settingsPopUpIsClosed) {
      this.closeSettingsPopUp();
      this.GetService.get(this.sex, this.popupData[i].lat,this.popupData[i].lon).subscribe(data => {
        this.user = {
          geoLocation: this.popupData[i].display_name,
          lat: this.popupData[i].lat,
          lon: this.popupData[i].lon,
          sex: this.sex
        };
        this.data = data;
        this.store.dispatch(new SetSettings({
          user: this.user,
          data: data
        }));
        this.backButton = 'hidden';
        this.searchString = '';
        this.geoName = this.user.geoLocation;
        this.isLoading = false;
      });
    } else {
      this.GetService.get(this.user.sex, this.popupData[i].lat,this.popupData[i].lon).subscribe(data => {
        this.data = data;
        this.isAnotherLocation = true;
        this.backButton = 'visible';
        this.isLoading = false;
      });
    }
  }

  addCurrentLocation() {
    this.store.select('data').subscribe(({data, isLoading, user}) => {
      //this.isLoading = isLoading;
      this.data = data;
      this.user = user;
      this.dateId = 0;
      this.backButton = 'hidden';
      this.searchString = '';
      this.geoName = user.geoLocation;
    });
  }

  searchLocation(searchString) {
    this.GetService.getGeoLocation(searchString).subscribe((data) => {
      this.popupData = data;
      this.popupIsClosed = false;
      this.geoName = searchString
    });
  }

  openSettings() {
    this.settingsPopUpData = this.user;
    this.settingsPopUpIsClosed = false;
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
        this.popupIsClosed = false;
      });
    }
  }

  getDataId(id) {
    this.dateId = id;
  }

  closePopup() {
    this.popupIsClosed = true;
  }

  closeSettingsPopUp() {
    this.settingsPopUpIsClosed = true;
  }
}
