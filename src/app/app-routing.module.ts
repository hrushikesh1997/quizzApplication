import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { QuizCatalogueModule } from './quiz-catalogue/quiz-catalogue.module';
import { AboutModule } from './about/about.module';


const routes: Routes = [
  {path:'home', loadChildren: () => import('./home/home.module').then(M => M.HomeModule)},
  {path:'quizCatalogue', loadChildren: () => import('./quiz-catalogue/quiz-catalogue.module').then(M => M.QuizCatalogueModule)},
  {path:'about', loadChildren: () => import('./about/about.module').then(M => M.AboutModule)},
  {path:'**', loadChildren: () => import('./home/home.module').then(M => M.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
