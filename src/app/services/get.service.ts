import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GetService {

  constructor(private http: HttpClient) {}

  get(sex: string, lat: number, lon: number) : Observable<any> {
    return this.http
      .get('http://localhost:8000/?sex=' + sex + '&lat=' + lat + '&lon=' + lon)
  }

  getGeoLocation(searchString: string) : Observable<any> {
    return this.http
      .get(' https://nominatim.openstreetmap.org/search/' + searchString + '?format=json')
  }

  getGeoName(lat: number, lon: number) : Observable<any> {
    return this.http
      .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
  }
}
