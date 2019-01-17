// Angular
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ml-header-nav',
  templateUrl: './header-nav.template.html',
  styleUrls: ['./header-nav.style.css'],
})

export class HeaderNavComponent implements OnChanges {

  @Input() geoName;
  @Input() searchString;
  @Input() backButton;

  @Output() onEmmitSearchClick = new EventEmitter<string>();
  @Output() onEmmitCurrentLocation = new EventEmitter();
  @Output() onEmmitOpenSettings = new EventEmitter();

  @ViewChild('searchLocationField') searchLocationField: any;

  constructor(
    public router: Router
  ) {}

  ngOnChanges() {
    this.searchString = this.geoName
  }

  onOpenSettings() {
    this.onEmmitOpenSettings.emit()
  }

  onSearchClick() {
    if (this.searchString == this.geoName || this.searchString == "") {
      return this.searchLocationField.nativeElement.focus()
    }
    this.onEmmitSearchClick.emit(this.searchString);
  }

  onAddCurrentLocation() {
    this.onEmmitCurrentLocation.emit()
  }

  onInputFocus() {
    this.searchString = ""
  }

  onInputBlur() {
    if (this.searchString == "") {
       this.searchString = this.geoName
    }
  }
}
