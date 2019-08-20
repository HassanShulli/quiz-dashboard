import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const apiURL = 'http://localhost:3000/'; // for local use
// const apiURL = 'https://abbys-caffe-api.herokuapp.com/'; // for heroku deployment

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // questions/create

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
  }

  appendHeader(header, content) {
    this.headers = this.headers.append(header, content);
  }

  // Items

  getQuestions(pageIndex, limit): Observable<any> {
    this.appendHeader('Content-Type', 'application/json');
    return this.http.request('get', `${apiURL}questions/read?pageIndex=${pageIndex}&limit=${limit}`, {headers: this.headers})
      .pipe(
        tap(result => {
        }),
        catchError(this.handleError('getQuestions()'))
      );
  }

  createQuestion(newQuestion): Observable<any> {
    return this.http.post(`${apiURL}questions/create`, newQuestion)
      .pipe(
        tap(result => {
        }),
        catchError(this.handleError('createQuestion()'))
      );
  }
  // updateApp(app): Observable<any> {
  //   return this.http.put(`${apiUrl}/app/${app._id}`, app, {headers: this.headers})
  //     .pipe(
  //       tap(result => {
  //       }),
  //       catchError(this.handleError('updateApp'))
  //     );
  // }


  updateQuestion(newQuestion): Observable<any> {
    return this.http.put(`${apiURL}questions/update`, newQuestion)
      .pipe(
        tap(result => {
        }),
        catchError(this.handleError('updateItem()'))
      );
  }
  // updateQuestion(newQuestion): Observable<any> {
  //   // this.appendHeader('Content-Type', 'application/json');
  //   return this.http.post(`${apiURL}questions/update`, newQuestion)
  //     .pipe(
  //       tap(result => {
  //       }),
  //       catchError(this.handleError('editQuestion()'))
  //     );
  // }

  deleteQuestion(id): Observable<any> {
    return this.http.delete(`${apiURL}questions/delete/${id}`)
      .pipe(
        tap(result => {
        }),
        catchError(this.handleError('createQuestion()'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}
