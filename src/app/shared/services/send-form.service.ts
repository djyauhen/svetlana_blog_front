import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleType} from "../../../types/article.type";
import {config} from "../../../config/config";

@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  constructor(public http: HttpClient) { }

  sendFormData(data: {name: string, phone: string, question: string}) {
    return this.http.post(`${config.API}/api/send-message`, data);
  }
}
