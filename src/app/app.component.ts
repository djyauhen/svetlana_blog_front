import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
