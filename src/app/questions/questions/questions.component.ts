import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  table: any = {};
  questionDataSource: any;
  questions: any;
  quizDataSource: any;
  quizzes: any;
  newQuestion: any;
  newQuiz: any;
  state: string;
  allOptions: string[];
  filteredQuestions: any;
  filteredQuizzes: any;
  quizTab: any;
  questionsTab: any;
  questionsLabel: any;
  quizLabel: any;

  questionColumns: string[] = ['createdAt', 'question', 'options', 'actions'];
  quizColumns: string[] = ['createdAt', 'name', 'questions', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.questionsTab = 'tab-active';
    this.quizTab = 'tab-inactive';
    this.questionsLabel = 'tab-label-active';
    this.quizLabel = 'tab-label-inactive';
    this.allOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    this.initQuestionsData();
  }

  initQuestionsData() {
    this.getQuestions(0, 10);
    this.state = 'getQuestions';
    this.newQuestion = {
      question: '',
      options: [{
        name: '',
        label: '',
        counter: 0
      }],
      correctAnswer: '',
      givenAnswer: ''
    };
  }

  initQuizData() {
    this.getQuizzes(0, 10);
    this.state = 'getQuizzes';
    this.newQuiz = {
      name: '',
      questions: []
    };
  }

  initPaginator(pageIndex, pageSize, length) {
    this.table.pageIndex = pageIndex;
    this.table.pageSize = pageSize;
    this.table.length = length;
  }

  onPageChange(evt) {
    this.getQuestions(evt.pageIndex, evt.pageSize);
  }

  filterQuestionsTable(input) {
    this.filteredQuestions = [];

    for (const h of this.questions) {
      const keys = Object.keys(h);
      for (const key of keys) {
        if (key === 'createdAt' || key === 'question') {
          if (h[key].toUpperCase().includes(input.toUpperCase())) {
            this.filteredQuestions.push(h);
            break;
          }
        } else if (key === 'options') {
          for (const opt of h[key]) {
            if (opt.name.toUpperCase().includes(input.toUpperCase())) {
              this.filteredQuestions.push(h);
              break;
            }
          }
        }
      }
    }

    this.questionDataSource = new MatTableDataSource(this.filteredQuestions);
  }

  filterQuizzesTable(input) {
    this.filteredQuizzes = [];

    for (const h of this.quizzes) {
      const keys = Object.keys(h);
      for (const key of keys) {
        if (key === 'createdAt' || key === 'name') {
          if (h[key].toUpperCase().includes(input.toUpperCase())) {
            this.filteredQuizzes.push(h);
            break;
          }
        } else if (key === 'questions') {
          for (const quiz of h[key]) {
            if (quiz.question.toUpperCase().includes(input.toUpperCase())) {
              this.filteredQuizzes.push(h);
              break;
            }
          }
        }
      }
    }

    this.quizDataSource = new MatTableDataSource(this.filteredQuizzes);
  }

  switchState(s) {
    this.state = s;
  }

  getQuizzes(pageIndex, limit) {
    this.dataService.getQuizzes(pageIndex, limit)
      .subscribe(result => {
        this.quizzes = result.docs;
        this.quizDataSource = new MatTableDataSource(result.docs);
        this.initPaginator(result.pagination.page, result.pagination.limit, result.pagination.total);
        console.log('this.quizzes : ', this.quizzes);
      });
  }

  getQuestions(pageIndex, limit) {
    this.dataService.getQuestions(pageIndex, limit)
      .subscribe(result => {
        this.questions = result.docs;
        this.questionDataSource = new MatTableDataSource(result.docs);
        this.initPaginator(result.pagination.page, result.pagination.limit, result.pagination.total);
        console.log('this.questions : ', this.questions);
      });
  }

  submitNewQuestion() {
    console.log('this.newQuestion submit: ', this.newQuestion);
    for (let i = 0; i < this.newQuestion.options.length; i++) {
      if (this.newQuestion.options[i].name === '') {
        alert('Please fill out all the options!');
        break;
      }

      if (i === this.newQuestion.options.length - 1) {
        console.log('this.newQuestion : ', this.newQuestion);
        console.log('this.state : ', this.state);
        if (this.newQuestion.question === ''
          || this.newQuestion.options.length === 0
          || this.newQuestion.givenAnswer === 0) {
          alert('Please fill out all the fields!');
          break;
        } else {
          if (this.state === 'addQuestions') {
            this.dataService.createQuestion(this.newQuestion)
              .subscribe(result => {
                if (result) {
                  console.log('result : ', result);
                  this.initQuestionsData();
                }
              }, err => {
                alert('An error occurred');
                this.initQuestionsData();
              });
          } else if (this.state === 'editQuestion') {
            this.dataService.updateQuestion(this.newQuestion)
              .subscribe(result => {
                if (result) {
                  console.log('result edit successful : ', result);
                  this.initQuestionsData();
                }
              }, err => {
                alert('An error occurred!');
              });
          }
        }
      }
    }
  }

  createQuiz() {
    if (this.newQuiz.name === '' || this.newQuiz.name === undefined || this.newQuiz.name === null) {
      alert('Please Insert Name Of The Quiz!');
    } else if (this.newQuiz.questions.length === 0) {
      alert('Please Select A Question!');
    } else {
      if (this.state === 'addQuiz') {
        this.dataService.createQuiz(this.newQuiz)
          .subscribe(result => {
            this.initQuizData();
          }, err => {
            alert('An error occurred!');
          });
      } else if (this.state === 'editQuiz') {
        console.log('This.newQuiz : ', this.newQuiz);

        this.dataService.updateQuiz(this.newQuiz)
          .subscribe(result => {
            console.log('result updaetd QUIZ : ', result);
            this.initQuizData();
          }, err => {
            alert('An error occurred!');
          });
      }
    }
  }

  switchTab(clickedTab) {
    if (clickedTab === 'quizTab') {
      this.quizTab = 'tab-active';
      this.questionsTab = 'tab-inactive';
      this.state = 'getQuizzes';
      this.questionsLabel = 'tab-label-active';
      this.quizLabel = 'tab-label-inactive';
      this.getQuizzes(0, 10);
    } else if (clickedTab === 'questionsTab') {
      this.quizTab = 'tab-inactive';
      this.questionsTab = 'tab-active';
      this.questionsLabel = 'tab-label-active';
      this.quizLabel = 'tab-label-inactive';
      this.state = 'getQuestions';
      this.getQuestions(0, 10);
    }
  }

  deleteQuestion(questionId) {
    console.log('questionId : ', questionId);
    if (confirm('Are you sure you want to delete ?')) {
      this.dataService.deleteQuestion(questionId)
        .subscribe(result => {
          if (result) {
            this.getQuestions(this.table.pageIndex, this.table.pageSize);
          }
        }, err => {
          alert('An error occurred!');
        });
    }
  }

  deleteQuiz(quizId) {
    console.log('quizId : ', quizId);
    if (confirm('Are you sure you want to delete ?')) {
      this.dataService.deleteQuiz(quizId)
        .subscribe(result => {
          if (result) {
            this.getQuizzes(this.table.pageIndex, this.table.pageSize);
          }
        }, err => {
          alert('An error occurred!');
        });
    }
  }

  addQuestion() {
    this.newQuestion = {
      question: '',
      options: [{
        name: '',
        label: '',
        counter: 0
      }],
      correctAnswer: '',
      givenAnswer: ''
    };
  }

  addQuiz() {
    this.initQuizData();
    this.getQuestions(0, 100);
  }

  editQuestion(question) {
    this.newQuestion = question;
  }

  editQuiz(quiz) {
    this.newQuiz = quiz;
    const selected = quiz.questions;
    this.newQuiz.questions = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < this.questions.length; j++) {
        if (selected[i]._id === this.questions[j]._id) {
          console.log('this.newQuiz.questions : ', this.newQuiz.questions);
          this.newQuiz.questions.push(this.questions[j]);
        }
      }

    }
    console.log('this.newQuiz : ', this.newQuiz);
  }

  selectAllQuestions() {
    this.newQuiz.questions = this.questions;
    console.log('this.newQuiz.questions : ', this.newQuiz.questions);
  }

  deselectAllQuestions() {
    this.newQuiz.questions = [];
    console.log('this.newQuiz.questions : ', this.newQuiz.questions);
  }

  deleteOption(optionForDelete, itemIndex) {
    for (let i = 0; i < this.newQuestion.options.length; i++) {
      if (i === itemIndex) {
        this.newQuestion.options.splice(i, 1);
        break;
      }
    }
  }

  editOption(optionForEdit, itemIndex) {
    this.newQuestion.options[itemIndex] = optionForEdit;
  }

  addOption() {
    if (this.newQuestion.options.length < 8) {
      this.newQuestion.options.push({
        name: '',
        label: '',
        counter: 0
      });
    } else {
      alert('You can add a maximum of 8 options per question!');
    }
  }

}
