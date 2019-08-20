import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'questions',
    loadChildren: './questions/questions.module#QuestionsModule',
  },
  {
    path: 'quiz',
    loadChildren: './quiz/quiz.module#QuizModule',
  },
  {
    path: '**',
    loadChildren: './home/home.module#HomeModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
