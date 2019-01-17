import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ValidatorService {

  private inputIsEmpty: string = 'Вы забыли заполнить поле геолокации :(';
  private sexIsEmpty: string = 'Выбирите Ваш пол';

  constructor() {}

  settingsValidator(settings): any {
    let errors = [];
    if (settings.geoLocation == '') {
      errors[0] = this.inputIsEmpty;
    }
    if (settings.sex == null) {
      errors[1] = this.sexIsEmpty
    }

    return errors;
  }

}
