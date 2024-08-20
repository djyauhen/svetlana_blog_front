import {Component} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminArticleService} from "../../../shared/services/admin-article.service";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {ArticleCardComponent} from "../../../shared/components/article-card/article-card.component";
import {NgxMaskDirective} from "ngx-mask";
import {SendFormService} from "../../../shared/services/send-form.service";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatIcon,
    MatInput,
    RouterLink,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    ArticleCardComponent,
    MatPrefix,
    NgxMaskDirective
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  title = 'Главная';

  services = [
    {
      title: 'Расторжение брака, признание брака недействительным',
      subtitle: 'Расторжение брака',
      points: [
        'Расторжение брака при согласии сторон',
        'Расторжение брака в судебном порядке',
        'Расторжение брака с лицом, место жительства которого неизвестно, пропавшим без вести, отбывающим наказание в местах лишения свободы',
        'Расторжение брака с иностранным гражданином',
        'Признание брака недействительным'
      ]
    },
    {
      title: 'Раздел имущества',
      subtitle: 'Раздел имущества',
      points: [
        'Соглашение о разделе общего имущества супругов',
        'Раздел совместно нажитого имущества в браке и при разводе',
        'Раздел общего имущества при банкротстве',
        'Споры о разделе долгов супругов',
        'Раздел бизнеса супругов',
        'Раздел интеллектуальной собственности при разводе'
      ]
    },
    {
      title: 'Брачный договор',
      subtitle: 'Брачный договор',
      points: [
        'Заключение брачного договора',
        'Изменение и расторжение брачного договора',
        'Признание брачного договора недействительным'
      ]
    },
    {
      title: 'Взыскание алиментов',
      subtitle: 'Взыскание алиментов',
      points: [
        'Соглашение об уплате алиментов',
        'Взыскание алиментов в судебном порядке',
        'Взыскание дополнительных расходов ',
        'на детей и родителей',
        'Изменение размера алиментов'
      ]
    },
    {
      title: 'Споры о детях',
      subtitle: 'Споры о детях',
      points: [
        'Порядок осуществления родительских прав',
        'Устранение препятствий к общению с ребенком',
        'Лишение, восстановление, ограничение родительских прав',
        'Возврат (отобрание) ребенка от лица, удерживающего его не на основании закона или решения суда',
        'Определение места жительства ребенка',
        'Оспаривание/установление отцовства',
        'Усыновление',
        'Выезд ребенка за границу при несогласии родителя',

      ]
    },
    {
      title: 'Юридическое сопровождение сделок и споры с недвижимостью',
      subtitle: 'Сделки <br> с недвижимостью',
      points: [
        'Проверка «чистоты» объекта ',
        'и юридический аудит сделки',
        'Подготовка необходимой документации ',
        'для заключения договора (купли-продажи, дарения, аренды)',
        'Юридическое сопровождение при подписании договора и проведении взаиморасчетов',
        'Споры о признании права собственности',
        'Споры связанные с государственной регистрацией прав на имущество',
        'Жилищные споры'
      ]
    },
  ]

  principlesItems = [
    {
      title: 'Эмоциональная вовлеченность',
      description: 'Для меня значим запрос каждого клиента, который ко мне обращается. За каждым юридическим вопросом стоит человек и его личная история — я продолжаю быть глубоко эмпатичным юристом, который пропускает все через себя, и защищает интересы доверителя, как своисобственные.'
    },
    {
      title: 'Добросовестность',
      description: 'Соблюдаю дедлайны и всегда остаюсь на вашей стороне. Я не сторонник затяжных судебных процессов и отдаю предпочтение мирному урегулированию конфликта там, где это возможно, особенно в спорах о детях.'
    },
    {
      title: 'Узкая специализация и профессионализм',
      description: 'Основную часть моей юридической практики составляют семейные и имущественные споры, что позволяет не распыляться на все отрасли права, оставаясь узкопрофильным специалистом, неустанно развиваясь и совершенствуясь в своей области.'
    },
    {
      title: 'Избирательность',
      description: 'Подписание соглашения об оказании юридической помощи и получение гонорара для меня не является основной целью — я защищаю права тех, с кем наши ценности и взгляды совпадают, что обеспечивает надежное, плодотворное и комфортное сотрудничество.'
    },
    {
      title: 'Конфиденциальность',
      description: 'Один из основополагающих принципов работы — это обязанность хранить профессиональную тайну. Этот принцип особенно актуален в семейной сфере, где юристу доверяют подробности личной жизни и семейного быта, «по отношению к которым слепая Фемида должна быть и глухой».'
    },
  ]

  articles: ArticleType[] | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    question: ['', Validators.required],
  });

  dialogMenu: HTMLDialogElement | null = null;
  thanksDialog: boolean = false;
  errorDialog: boolean = false;

  constructor(private articleService: AdminArticleService,
              private sendDataService: SendFormService,
              private fb: FormBuilder,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.articleService.getAdminArticles({page: 1})
      .subscribe({
        next: data => {
          if (data && (data.articles.length > 0)) this.articles = data.articles;
        }
      })
  }

  openDialog(dialogID: string) {
    if (this.dialogMenu) {
      this.dialogMenu.close();
    }
    this.dialogMenu = document.getElementById(dialogID) as HTMLDialogElement;
    if (this.dialogMenu) this.dialogMenu.showModal();
  }

  closeDialog() {
    if (this.dialogMenu) {
      this.thanksDialog = false;
      this.errorDialog = false;
      this.dialogMenu.close();
    }
    this.clearForm();
    this.dialogMenu = null;
  }

  clearForm() {
    this.form.reset();
  }

  sendOrder() {
    if (this.form.valid) {
      this.loaderService.show();
      console.log(this.form.value);
      const data = {
        name: this.form.get('name')!.value!,
        phone: this.form.get('phone')!.value!,
        question: this.form.get('question')!.value!
      }

      this.sendDataService.sendFormData(data)
        .subscribe({
          next: data => {
            if (data) {
              console.log(data);
              this.thanksDialog = true;
              this.openDialog('dialog-form');
              this.clearForm();
            }
          },
          error: err => {
            this.errorDialog = false;
            this.openDialog('dialog-form');
            this.clearForm();
            console.log(err);
          }
        })
    }
  }

  protected readonly Math = Math;
}
