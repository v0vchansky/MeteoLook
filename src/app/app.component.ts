// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
// Services
import { GetService } from './services/get.service';
// Models
import { serverData } from './models/serverData.model';
import { AppState } from './app.state';
// Actions
import { GetData, SetData, SetLocation } from './actions/data.action';
import {User} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetService]
})
export class AppComponent implements OnInit {

  data?: serverData[];
  user: User;
  time: number;
  lon: number;
  lat: number;
  // onlineOffline: boolean = navigator.onLine;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private GetService: GetService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new SetData(true));
    this.store.select('data').subscribe(({user, data, time}) => {
      this.user = user;
      this.data = data;
      this.time = time;
    });

    if (!this.user) {
      this.router.navigateByUrl('welcome-page').then();
    } else {
      let thisTime = Math.round((new Date()).getTime() / 1000) + 10800;
      if (thisTime - this.time > 21600) {
        // TODO проверка на соединение с интернетом + обновление data + более совершенная система с проверкой времени (переход на новый день)
        this.GetService.get(this.user.sex, this.user.lat,this.user.lon).subscribe( (data) => {
          this.store.dispatch(new GetData(JSON.stringify(data)));
          this.router.navigateByUrl('main-page').then();
        },() => {
          this.router.navigateByUrl('main-page').then();
        })
      } else {
        this.router.navigateByUrl('main-page').then();
      }
    }

    //this.router.navigateByUrl('user-settings').then();
    // if(navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     let lat = Number(position.coords.latitude.toFixed(6)),
    //         lon = Number(position.coords.longitude.toFixed(6));
    //
    //     this.store.dispatch(new SetData(true));
    //
    //     this.store.select('data').subscribe(({data, lon, lat}) => {
    //       this.data = data;
    //       this.lon = lon;
    //       this.lat = lat;
    //     });
    //
    //     if (Math.abs(this.lat - lat) > 0.0005 || Math.abs(this.lon - lon) > 0.0005) {
    //       this.setLocation(lat, lon);
    //     }
    //
    //     if (!this.data) {
    //       // TODO сделать пол (стартовая страница)
    //
    //       this.setLocation(lat, lon);
    //
    //       this.GetService.get('man', lat, lon).subscribe(data => {
    //         this.store.dispatch(new GetData(JSON.stringify(data)))
    //       })
    //     } else {
    //       this.store.dispatch(new SetData(false))
    //     }
    //   }, () => {
    //     alert('Включине геолокацию и перезапустите приложение...')
    //     // TODO popup типо не можем взять гео
    //   }, {maximumAge: 30000, timeout: 27000});
    // }
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
