import {Component} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {AdminArticleService} from "../../../shared/services/admin-article.service";
import {ActivatedRoute} from "@angular/router";
import {Location, NgIf} from "@angular/common";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  title: string = '';
  article: ArticleType | null = null;
  durationText: string = '';

  constructor(private articleService: AdminArticleService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe({
        next: param => {
          this.articleService.getAdminArticleById(param['id'])
            .subscribe({
              next: data => {
                if (data) {
                  this.title = data.title;
                  this.article = data;
                  this.getDurationText(this.article.duration);
                }
              }
            });
        }
      })
  }

  getDurationText(duration: number) {
    switch (duration) {
      case 1:
        this.durationText = 'минута';
        break;
      case 2 || 3 || 4:
        this.durationText = 'минуты';
        break;
      default:
        this.durationText = 'минут';
    }
  }

  clickBack() {
    this.location.back();
  }
}
