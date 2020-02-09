import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLandingComponent } from './home-landing/home-landing.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizComponent } from './quiz/quiz.component';


const routes: Routes = [
  {path:'',component: HomeLandingComponent},
  {path:'createQuiz',component: CreateQuizComponent},
  {path:'quiz',component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
