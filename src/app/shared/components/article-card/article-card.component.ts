import {Component, Input} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'article-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article!: ArticleType;

  constructor(private router: Router) {
  }

  openArticle(articleId:string) {
    if (articleId) {
      this.router.navigate([`blog/${articleId}`]);
    }
  }
}
