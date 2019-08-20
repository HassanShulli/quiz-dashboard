import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions/questions.component';
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
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
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
    MatSelectModule
  ],
  entryComponents: [
    QuestionsComponent
  ]
})
export class QuestionsModule { }
