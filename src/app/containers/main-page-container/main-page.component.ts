// Angular
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
// Models
import { serverData } from '../../models/serverData.model';
import { AppState } from '../../app.state';
// Services
import { GetService } from '../../services/get.service';
import {GetData} from '../../actions/data.action';

@Component({
  selector: 'ml-main-page',
  templateUrl: './main-page.template.html',
  styleUrls: ['./main-page.style.css'],
  providers: [GetService]
})

export class MainPageComponent implements OnInit {

  data?: serverData[];
  dateId: number;
  isLoading: boolean = true;
  itemWidth: number;
  imageHeight: number;
  popupIsClosed: boolean = true;
  popupData: any;
  isAnotherLocation: boolean = false;
  geoName: string;
  searchString: string;
  backButton: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private GetService: GetService,
  ) {}

  ngOnInit() {
    this.backButton = 'hidden';
    this.store.select('data').subscribe(({data, isLoading, geoName, lat}) => {
      console.log(data, isLoading, geoName, lat);
      this.isLoading = isLoading;
      this.data = data;
      this.geoName = geoName;
      this.dateId = 0;
    });
    this.itemWidth = document.documentElement.clientWidth / 3;
    this.imageHeight = document.documentElement.clientHeight - 220;
  }

  addAnotherLocation(i) {
    this.closePopup();
    this.isLoading = true;
    this.GetService.get('man', this.popupData[i].lat,this.popupData[i].lon).subscribe(data => {
        this.data = data;
        this.isAnotherLocation = true;
        this.backButton = 'visible';
        this.isLoading = false;
      })
  }

  addCurrentLocation() {
    this.store.select('data').subscribe(({data, isLoading}) => {
      this.isLoading = isLoading;
      this.data = data;
      this.dateId = 0;
      this.backButton = 'hidden';
      this.searchString = '';
    });
  }

  searchLocation(searchString) {
    this.GetService.getGeoLocation(searchString).subscribe((data) => {
      console.log(data);
      this.popupData = data;
      this.popupIsClosed = false;
    })
  }

  getDataId(id) {
    this.dateId = id;
  }

  closePopup() {
    this.popupIsClosed = true;
  }
}
