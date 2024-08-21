import {Component, OnInit} from '@angular/core';
import {ArticleCardComponent} from "../../../shared/components/article-card/article-card.component";
import {Location, NgForOf, NgIf} from "@angular/common";
import {AdminArticleService} from "../../../shared/services/admin-article.service";
import {ArticleType} from "../../../../types/article.type";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    ArticleCardComponent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit{

  articles: ArticleType[] | null = null;
  constructor(private articleService: AdminArticleService,
              private location: Location) {
  }
  ngOnInit() {
    this.articleService.getAdminArticles({page: 1})
      .subscribe({
        next: data => {
          if (data && (data.articles.length > 0)) {
            this.articles = data.articles;
            this.articleService.updateShowBlogLinks(true);
          } else {
            this.articleService.updateShowBlogLinks(false);
          }
        },
        error: err => {
          console.log(err);
        }
      })
  }
  clickBack() {
    this.location.back();
  }
}
