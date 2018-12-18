// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ml-header-nav',
  templateUrl: './header-nav.template.html',
  styleUrls: ['./header-nav.style.css'],
})

export class HeaderNavComponent {

  @Input() geoName;
  @Input() searchString;
  @Input() backButton;

  @Output() onEmmitSearchClick = new EventEmitter<string>();
  @Output() onEmmitCurrentLocation = new EventEmitter();

  constructor() {}

  onSearchClick() {
    this.onEmmitSearchClick.emit(this.searchString);
  }

  onAddCurrentLocation() {
    this.onEmmitCurrentLocation.emit()
  }
}
