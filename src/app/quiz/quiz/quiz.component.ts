import {Component, OnInit} from '@angular/core';

import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizAll: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getQuizAll();
  }

  getQuizAll() {
    this.dataService.getQuizzes(0, 100)
      .subscribe(result => {
        this.quizAll = result.docs;
        console.log('this.quizAll : ', this.quizAll);
      });
  }

}
