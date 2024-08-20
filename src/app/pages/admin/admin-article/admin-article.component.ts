import {Component} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminArticleService} from "../../../shared/services/admin-article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AngularEditorModule} from "@kolkov/angular-editor";

@Component({
  selector: 'app-admin-article',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AngularEditorModule,
    NgOptimizedImage
  ],
  templateUrl: './admin-article.component.html',
  styleUrl: './admin-article.component.scss'
})
export class AdminArticleComponent{
  title = 'Статья';
  fragment: string = '';
  article: ArticleType | null = null;
  articleImageURL: string | null = null;
  articleImage: File | null = null;
  fileInput: HTMLInputElement | null = null;
  updatePage: boolean = false;
  dialogMenu: HTMLDialogElement | null = null;

  form = this.fb.group({
    title: ['', Validators.required],
    duration: ['', Validators.required],
    text: ['', Validators.required],
  })


  constructor(private activatedRoute: ActivatedRoute,
              private route: Router,
              private adminArticlesService: AdminArticleService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
      this.fragment = url[0].path;

      if (this.fragment === 'update') {
        this.getArticle();
        this.updatePage = true;
      } else if (this.fragment === 'create') {
        this.updatePage = false;
      }
    })
  }

  getArticle() {
    this.activatedRoute.params
      .subscribe({
        next: param => {
          this.adminArticlesService.getAdminArticleById(param['id'])
            .subscribe({
              next: data => {
                this.article = data;

                if (this.article) {
                  this.form.patchValue({title: this.article.title});
                  this.form.patchValue({duration: this.article.duration.toString()});
                  this.form.patchValue({text: this.article.text});

                  if (this.article.image && (this.article.image !== '')) {
                    this.articleImageURL = this.article.image;
                  }
                }
              }
            });
        }
      })
  }

  selectImage() {
    this.fileInput ? this.fileInput.click() : null;
  }

  handleImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file) {
        this.articleImageURL = URL.createObjectURL(file);
        this.articleImage = file;
      }
    }
  }

  deleteImage() {
    this.articleImageURL = null;
  }

  goHome() {
    this.route.navigate(['/admin']).then()
  }

  addArticle() {
    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value!);
    formData.append('duration', this.form.get('duration')?.value!);
    formData.append('text', this.form.get('text')?.value!);
    formData.append('image', this.articleImage || '');

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.adminArticlesService.addAdminArticle(headers, formData)
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.form.reset();
            this.articleImageURL = null;
            this.articleImage = null;
            this.openDeleteDialog();
          },
          error: (err) => {
            throw new Error(err);
          }
        }
      );
  }

  updateArticle() {
    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value!);
    formData.append('duration', this.form.get('duration')?.value!);
    formData.append('text', this.form.get('text')?.value!);
    if (this.articleImage) {
      formData.append('image', this.articleImage);
    }
    if (!this.articleImageURL) {
      formData.append('imageDelete', 'true');
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.adminArticlesService.updateAdminArticle(headers, formData, this.article!._id)
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.openDeleteDialog();
          },
          error: (err) => {
            throw new Error(err);
          }
        }
      );
  }

  clickButton() {
    if (this.updatePage) {
      this.updateArticle();
    } else {
      this.addArticle();
    }
  }

  openDeleteDialog() {
    this.dialogMenu = document.querySelector('dialog') as HTMLDialogElement;
    if (this.dialogMenu) {
      this.dialogMenu.showModal();
    }
  }


  closeDialog() {
    if (this.dialogMenu) {
      this.dialogMenu.close();
      this.router.navigate(['admin']);
    }
  }
}
