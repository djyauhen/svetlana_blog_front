import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AdminArticleService} from "../../services/admin-article.service";
import {NgIf} from "@angular/common";

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
  hiddenBlogLink = true;

  constructor(private articleService: AdminArticleService) {
  }
  ngOnInit() {
    this.articleService.getAdminArticles({page: 1})
      .subscribe({
        next: data => {
          if (data && (data.articles.length > 0)) this.hiddenBlogLink = false;
        }
      })
  }
}
