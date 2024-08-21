import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {AdminArticleService} from "../../services/admin-article.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showBlogLinks: boolean = false;

  constructor(private articleService: AdminArticleService) {}

  ngOnInit() {
    this.articleService.showBlogLinks$.subscribe(value => {
      this.showBlogLinks = value;
    });
  }
}
