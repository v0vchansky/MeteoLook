// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ml-locations-list',
  templateUrl: './locations-list.template.html',
  styleUrls: ['./locations-list.style.css'],
})

export class LocationsListComponent {

  @Input() data: any;

  @Output() onEmmitAnotherLocation = new EventEmitter();

  constructor() {}

  onAddAnotherLocation(i: number) {
    this.onEmmitAnotherLocation.emit(i);
  }
}
