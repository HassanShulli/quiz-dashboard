import {Component, OnInit} from '@angular/core';

import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizAll: any;
  state: any;
  currentQuiz: any;
  currentCounter: any;
  score: any;
  mode: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.mode = 'default';
    this.state = 'readQuiz';
    this.getQuizAll();
  }

  printSelected(q) {
    console.log('q.correctAnswer : ', q.correctAnswer);
    console.log('q.givenAnswer : ', q.givenAnswer);
  }

  switchState(s) {
    this.state = s;
  }

  getQuizAll() {
    this.dataService.getQuizzes(0, 1000)
      .subscribe(result => {
        this.quizAll = result.result;
      });
  }

  takeQuiz(quiz) {
    this.dataService.getCounter(quiz._id)
      .subscribe(response => {
        this.currentCounter = response.result[0];
      });
    this.mode = 'default';
    this.state = 'takeQuiz';
    this.currentQuiz = quiz;
    console.log('this.currentQuiz : ', this.currentQuiz);
  }

  restartQuiz() {
    this.state = 'takeQuiz';
    this.mode = 'default';
    this.currentQuiz.questions.forEach(question => {
      question.givenAnswer = '';
    });
  }

  back() {
    this.currentQuiz.questions.forEach(question => {
      question.givenAnswer = '';
    });
  }

  submitQuiz() {
    this.mode = 'markQuiz';

    this.score = 0;

    for (let i = 0; i < this.currentQuiz.questions.length; i++) {

      if (this.currentQuiz.questions[i].correctAnswer === this.currentQuiz.questions[i].givenAnswer) {
        this.score += 1;
        // console.log('this.score  :  ', this.score, typeof this.score);
      }
      if (i === this.currentQuiz.questions.length - 1) {
        this.currentCounter.count += 1;
        this.currentCounter.total += this.score / this.currentQuiz.questions.length;

        const counterString = this.currentCounter.total.toString();

        counterString.slice(0, (counterString.indexOf('.')) + 3);
        this.currentCounter.total = parseInt(counterString, 10);
        // num = num.toString(); //If it's not already a String
        // num = num.slice(0, (num.indexOf("."))+3); //With 3 exposing the hundredths place
        // Number(num);


        // console.log('this.currentCounter.count : ', this.currentCounter.count, typeof this.currentCounter.count);
        console.log('this.currentCounter.total : ', this.currentCounter.total, typeof this.currentCounter.total);
        this.dataService.updateCount(this.currentCounter)
          .subscribe(
            res => {
              console.log('response of updated counter : ', res);
            }
          );
      }

    }
  }


}
