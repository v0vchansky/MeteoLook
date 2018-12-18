// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ml-popup',
  templateUrl: './popup.template.html',
  styleUrls: ['./popup.style.css'],
})

export class PopupComponent {

  @Input() data: any;

  @Output() onEmmitClosePopup = new EventEmitter();
  @Output() onEmmitAnotherLocation = new EventEmitter();

  constructor() {}

  onClose() {
    this.onEmmitClosePopup.emit();
  }

  onAddAnotherLocation(i: number) {
    this.onEmmitAnotherLocation.emit(i);
  }

}
