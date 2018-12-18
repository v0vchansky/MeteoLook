// Angular
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// Services
import { GetService } from './services/get.service';
// Models
import { serverData } from './models/serverData.model';
import { AppState } from './app.state';
// Actions
import { GetData, SetData, SetLocation } from './actions/data.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetService]
})
export class AppComponent implements OnInit {

  data?: serverData[];
  lon?: number;
  lat?: number;

  constructor(
    private GetService: GetService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = Number(position.coords.latitude.toFixed(6)),
            lon = Number(position.coords.longitude.toFixed(6));

        this.store.dispatch(new SetData(true));

        this.store.select('data').subscribe(({data, lon, lat}) => {
          this.data = data;
          this.lon = lon;
          this.lat = lat;
        });

        if (Math.abs(this.lat - lat) > 0.0005 || Math.abs(this.lon - lon) > 0.0005) {
          this.setLocation(lat, lon);
        }

        if (!this.data) {
          // TODO сделать пол (стартовая страница)

          this.setLocation(lat, lon);

          this.GetService.get('man', lat, lon).subscribe(data => {
            this.store.dispatch(new GetData(JSON.stringify(data)))
          })
        } else {
          this.store.dispatch(new SetData(false))
        }
      }, () => {
        // TODO popup типо не можем взять гео
      }, {enableHighAccuracy: false, maximumAge: 30000, timeout: 27000});
    }
  }

  setLocation(lat, lon) {
    this.GetService.getGeoName(lat, lon).subscribe(data => {
      this.store.dispatch(new SetLocation({
        lat: lat,
        lon: lon,
        geoName: data.address.state
      }));
    });
  }
}
