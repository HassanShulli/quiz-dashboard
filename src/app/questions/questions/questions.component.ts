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
  newQuestion: any;
  state: string;
  allOptions: string[];
  filteredQuestions: any;

  questionColumns: string[] = ['createdAt', 'question', 'options', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.allOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    this.initData();
  }

  initData() {
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

  initPaginator(pageIndex, pageSize, length) {
    this.table.pageIndex = pageIndex;
    this.table.pageSize = pageSize;
    this.table.length = length;
  }

  onPageChange(evt) {
    this.getQuestions(evt.pageIndex, evt.pageSize);
  }

  filterTable(input) {
    this.filteredQuestions = [];

    for (const h of this.questions) {
      const keys = Object.keys(h);
      for (const key of keys) {
        if (key === 'created' || key === 'question') {
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

  switchState(s) {
    this.state = s;
  }

  getQuestions(pageIndex, limit) {
    this.dataService.getQuestions(pageIndex, limit)
      .subscribe(result => {
        this.questions = result.docs;
        this.questionDataSource = new MatTableDataSource(result.docs);
        this.initPaginator(result.pagination.page, result.pagination.limit, result.pagination.total);
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
                  this.initData();
                }
              }, err => {
                alert('An error occurred');
                this.initData();
              });
          } else if (this.state === 'editQuestion') {
            this.dataService.updateQuestion(this.newQuestion)
              .subscribe(result => {
                if (result) {
                  console.log('result edit successful : ', result);
                  this.initData();
                }
              }, err => {
                alert('An error occurred!');
              });
          }
        }
      }

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

  editQuestion(question) {
    console.log('question : ', question);
    this.newQuestion = question;
    console.log('this.newQuestion : ', this.newQuestion);
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
