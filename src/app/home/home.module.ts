import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { HomeLandingComponent } from './home-landing/home-landing.component';
import { HomeRoutingModule } from './home-routing.module';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';



@NgModule({
  declarations: [HomeLandingComponent, CreateQuizComponent, QuizComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[AuthService]
})
export class HomeModule { }
