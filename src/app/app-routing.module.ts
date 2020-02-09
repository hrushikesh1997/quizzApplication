import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { QuizCatalogueModule } from './quiz-catalogue/quiz-catalogue.module';
import { AboutModule } from './about/about.module';


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home', loadChildren: './home/home.module#HomeModule'},
  {path:'quizCatalogue', loadChildren: './quiz-catalogue/quiz-catalogue.module#QuizCatalogueModule'},
  {path:'about', loadChildren: './about/about.module#AboutModule'}
  //{path:'**', loadChildren: () => import('./home/home.module').then(M => M.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
