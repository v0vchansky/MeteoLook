// Angular
import { Component, Input } from '@angular/core';
// Models
import { serverData } from '../../models/serverData.model';

@Component({
  selector: 'ml-image',
  templateUrl: './image.template.html',
  styleUrls: ['./image.style.css'],
})

export class ImageComponent {

  @Input() dateId: number;
  @Input() data: serverData[];
  @Input() imageHeight: number;

  constructor() {}
}
