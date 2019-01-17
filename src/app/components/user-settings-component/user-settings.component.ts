// Angular
import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
// Services
import { GetService } from '../../services/get.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'ml-user-settings',
  templateUrl: './user-settings.template.html',
  styleUrls: ['./user-settings.style.css'],
  providers: [GetService]
})

export class UserSettingsComponent implements OnInit {

  @Input() data: any;
  @Input() sex: string;
  @Input() formErrors: any;

  @Output() onFormSubmitEmmit = new EventEmitter<User>();

  @ViewChild('womanRadioButton') womanRadioButton: ElementRef;
  @ViewChild('manRadioButton') manRadioButton: ElementRef;

  constructor() {}

  ngOnInit(): void {

    switch(this.data['sex']) {
      case "man":
        setTimeout(() => {this.manRadioButton.nativeElement.click()}, 1);
        break;
      case "woman":
        setTimeout(() => {this.womanRadioButton.nativeElement.click()}, 1);
        break;
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
