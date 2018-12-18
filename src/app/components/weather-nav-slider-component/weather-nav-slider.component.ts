// Angular
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
// Models
import { serverData } from '../../models/serverData.model';

@Component({
  selector: 'ml-weather-nav-slider',
  templateUrl: './weather-nav-slider.template.html',
  styleUrls: ['./weather-nav-slider.style.css'],
})

export class WeatherNavSliderComponent {

  @Input() dateId: number;
  @Input() data: serverData[];
  @Input() itemWidth: number;

  @Output() onEmmit = new EventEmitter<number>();

  items: object = [0,1,2,3,4,5,6];

  constructor() {}

  onNavClick(id: number) {
    this.onEmmit.emit(id);
  }
}
