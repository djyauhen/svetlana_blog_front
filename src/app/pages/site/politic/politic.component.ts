import { Component } from '@angular/core';
import {NgIf, Location} from "@angular/common";

@Component({
  selector: 'app-politic',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './politic.component.html',
  styleUrl: './politic.component.scss'
})
export class PoliticComponent {
  title = 'Политика конфендециальности';

  constructor(private location: Location) {
  }

  clickBack() {
    this.location.back();
  }
}
