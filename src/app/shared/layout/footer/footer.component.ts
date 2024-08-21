import {Component, Input} from '@angular/core';
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
  showBlogLinks: boolean = false;
  dialogMenu: HTMLDialogElement | null = null;

  constructor(private articleService: AdminArticleService) {}

  ngOnInit() {
    this.articleService.showBlogLinks$.subscribe(value => {
      this.showBlogLinks = value;
    });
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
