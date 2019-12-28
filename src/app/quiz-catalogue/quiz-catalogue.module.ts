import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizCatalogueRoutingModule } from './quiz-catalogue-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';


@NgModule({
  declarations: [QuizListComponent],
  imports: [
    CommonModule,
    QuizCatalogueRoutingModule
  ]
})
export class QuizCatalogueModule { }
