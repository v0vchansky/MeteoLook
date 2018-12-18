// Angular
import {Component, Input} from '@angular/core';

@Component({
  selector: 'ml-loader',
  templateUrl: './loader.template.html',
  styleUrls: ['./loader.style.css'],
})

export class LoaderComponent {

  @Input() loaderIsClosed: boolean;

  constructor() {}
}
