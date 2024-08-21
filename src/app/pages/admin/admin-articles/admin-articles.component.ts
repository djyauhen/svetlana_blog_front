import {Component} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {AdminArticleService} from "../../../shared/services/admin-article.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-articles',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-articles.component.html',
  styleUrl: './admin-articles.component.scss'
})
export class AdminArticlesComponent{
  title = 'Администратор';
  articles: ArticleType[] | null = null;
  articleID: string | null = null;
  pages: number[] = [];
  page!: number;

  constructor(private articlesAdminService: AdminArticleService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
        this.page = params['page'] ? parseInt(params['page'], 10) : 1;

        this.articlesAdminService.getAdminArticles(params).subscribe({
          next: data => {
            if (data) {
              this.pages = [];
              for (let i = 1; i <= data.pages; i++) {
                this.pages.push(i);
              }
              this.articles = data.articles;
            } else {
              this.articles = null;
            }
          },
          error: error => {
            console.log('Error:', error);
            // Handle error if needed
          }
        });
      });
  }

  deleteArticle() {
    if (this.articleID) {this.articlesAdminService.deleteAdminArticleById(this.articleID)
      .subscribe({
        next: data => {
          if (data) {
            this.closeDialog('dialog-delete');
            this.ngOnInit();
          } else {
            console.log('Произошла ошибка')
          }
        }
      })}
    else {
      this.closeDialog('dialog-delete');
    }
  }

  openDeleteDialog(dialogID: string, articleID: string) {
    if (articleID) this.articleID = articleID;
    let dialogMenu: HTMLDialogElement | null = document.getElementById(dialogID) as HTMLDialogElement;
    if (dialogMenu) {
      dialogMenu.showModal();
    }
  }


  closeDialog(dialogID: string) {
    let dialogMenu: HTMLDialogElement | null = document.getElementById(dialogID) as HTMLDialogElement;
    if (dialogMenu) {
      dialogMenu.close();
      this.articleID = null;
    }
  }

  openPrevPage() {
    if (this.page && this.page > 1)
      this.page--;
    this.router.navigate(['admin'], {
      queryParams: {page: this.page}
    });
  }

  openNextPage() {
    if (this.page && this.page < this.pages.length)
      this.page++;
    this.router.navigate(['admin'], {
      queryParams: {page: this.page}
    });
  }
}

