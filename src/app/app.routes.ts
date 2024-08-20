import { Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./pages/site/main/main.component";
import {ArticlesComponent} from "./pages/site/articles/articles.component";
import {ArticleComponent} from "./pages/site/article/article.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {AdminArticlesComponent} from "./pages/admin/admin-articles/admin-articles.component";
import {AdminArticleComponent} from "./pages/admin/admin-article/admin-article.component";
import {PoliticComponent} from "./pages/site/politic/politic.component";

export const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {path: '', component: MainComponent, pathMatch: "full"},
    {path: 'blog', component: ArticlesComponent},
    {path: 'blog/:id', component: ArticleComponent},
    {path: 'politic', component: PoliticComponent},
  ]
},
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: '', component: AdminArticlesComponent, pathMatch: "full"},
      {path: 'create', component: AdminArticleComponent},
      {path: 'update/:id', component: AdminArticleComponent}
    ]
  }];
