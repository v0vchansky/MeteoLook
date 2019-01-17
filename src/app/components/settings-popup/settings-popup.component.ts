// Angular
import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
// Models
import { User } from '../../models/user.model';

@Component({
  selector: 'ml-settings-popup',
  templateUrl: './settings-popup.template.html',
  styleUrls: ['./settings-popup.style.css'],
})

export class SettingsPopupComponent implements OnChanges {

  @Input() data: User;
  @Input() sex: string;
  @Input() formErrors: any;

  @Output() onFormSubmitEmmit = new EventEmitter<User>();
  @Output() onEmmitClosePopup = new EventEmitter();

  @ViewChild('womanRadioButton') womanRadioButton: ElementRef;
  @ViewChild('manRadioButton') manRadioButton: ElementRef;

  searchString: string;

  constructor() {}

  ngOnChanges() {
    this.searchString = this.data['geoLocation'];
    console.log(this.searchString);
    switch(this.data.sex) {
      case "man":
        setTimeout(() => {this.manRadioButton.nativeElement.click()}, 1);
        break;
      case "woman":
        setTimeout(() => {this.womanRadioButton.nativeElement.click()}, 1);
        break;
    }
  }

  onClose() {
    this.onEmmitClosePopup.emit();
  }

  onInputFocus() {
    this.searchString = ""
  }

  onInputBlur() {
    if (this.searchString == "") {
      this.searchString = this.data.geoLocation;
    }
  }

  onSubmit(geoLocation) {
    console.log(this.sex);
    this.onFormSubmitEmmit.emit({
      geoLocation: geoLocation,
      lat: null,
      lon: null,
      sex: this.sex
    })
  }

}
