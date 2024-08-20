import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AdminArticleService} from "../../services/admin-article.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  hiddenBlogLink = true;

  dialogMenu: HTMLDialogElement | null = null;

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

  openDialog(dialogID: string) {
    if (this.dialogMenu) {
      this.dialogMenu.close();
    }
    this.dialogMenu = document.getElementById(dialogID) as HTMLDialogElement;
    if (this.dialogMenu) {
      this.dialogMenu.style.display = 'flex';
      this.dialogMenu.showModal();
    }
  }

  closeDialog() {
    if (this.dialogMenu) {
      this.dialogMenu.close();
      this.dialogMenu.style.display = 'none';
    }
    this.dialogMenu = null;
  }
}
