import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {Params} from "@angular/router";
import {config} from "../../../config/config";

@Injectable({
  providedIn: 'root'
})
export class AdminArticleService {
  private showBlogLinksSubject = new BehaviorSubject<boolean>(false);
  showBlogLinks$ = this.showBlogLinksSubject.asObservable();
  constructor(public http: HttpClient) { }


  updateShowBlogLinks(value: boolean) {
    this.showBlogLinksSubject.next(value);
  }

  getAdminArticles(params: Params): Observable<{totalCount: any, pages: any, articles: ArticleType[]} | null>{
    return this.http.get<{totalCount: any, pages: any, articles: ArticleType[]} | null>(`${config.API}/api/articles`, {
      params: params
    });
  }

  getAdminArticleById(id: string): Observable<ArticleType | null>{
    return this.http.get<ArticleType | null>(`${config.API}/api/articles/${id}`);
  }

  deleteAdminArticleById(id: string): Observable<ArticleType | null>{
    return this.http.delete<ArticleType | null>(`${config.API}/api/articles/${id}`);
  }

  addAdminArticle(headers: HttpHeaders, body: FormData): Observable<ArticleType | null>{
    return this.http.post<ArticleType | null>(`${config.API}/api/articles`, body, {headers: headers});
  }

  updateAdminArticle(headers: HttpHeaders, body: FormData, articleId: string): Observable<ArticleType | null>{
    return this.http.put<ArticleType | null>(`${config.API}/api/articles/${articleId}`, body, {headers: headers});
  }
}
