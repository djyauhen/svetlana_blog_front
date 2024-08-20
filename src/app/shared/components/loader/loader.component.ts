import {Component, OnInit} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoaderService} from "../../services/loader.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit{

  isShowed: boolean = false;

  constructor(private loaderService: LoaderService) {
  }
  ngOnInit() {
    this.loaderService.isShowed$.subscribe(isShowed => {
      this.isShowed = isShowed;
    })
  }
}
