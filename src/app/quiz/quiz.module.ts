import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuizRoutingModule} from './quiz-routing.module';
import {QuizComponent} from './quiz/quiz.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatRadioModule,
  MatSelectModule,
  MatCardModule,
  MatCheckboxModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule
  ]
})
export class QuizModule {
}
