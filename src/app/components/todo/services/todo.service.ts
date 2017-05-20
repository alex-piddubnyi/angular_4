import { Injectable } from '@angular/core';
import { Todo } from 'app/shared/todoClass';
import {
  Http,
  Headers,
  RequestOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw'; now in rxjs/Observable
import { Error } from 'tslint/lib/error';

@Injectable()
export class TodoService {
  private apiUrl = 'api/todos';

  constructor(private http: Http) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get(this.apiUrl)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  toggleTodoState(todo: Todo) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const url = `${this.apiUrl}/${todo.id}`;

    return this.http.put(url, todo, options)
                .catch(this.handleError);
  }

  addTodo(title: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const newTodo = new Todo(title);

    return this.http.post(this.apiUrl, newTodo, options)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  deleteTodo(todo: Todo) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const url = `${this.apiUrl}/${todo.id}`;

    return this.http.delete(url, options)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(new Error());
  }
}