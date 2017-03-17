import { Injectable } from '@angular/core';

import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

// import { Todo } from '../models/todo';

@Injectable()
export class TodoService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public todosUrl = "http://localhost:5000/api"; //URL to web api

  constructor(private http: Http) { }

  getTodos(url: string, headers): Promise<any> {
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  create(url: string, obj: any, headers): Promise<any> {
    return this.http.post(url, obj, { headers: this.headers })
      .toPromise()
      .then(res => {
        res.json()
        console.log(res.json());
      })
      .catch(this.handleError)
  }


  update(url: string, obj: any, headers): Promise<any> {
    return this.http.put(url, obj, { headers: this.headers })
      .toPromise()
      .then(res => {
        res.json()
        console.log(res.json())
      })
      .catch(this.handleError)

  }

  // delete(url: string, obj: any, headers): Promise<any> {
  //   let option = this.headers

  //   return this.http.delete(url, new RequestOptions({
  //     headers: this.headers,
  //     body: obj
  //   }))
  //     .toPromise()
  //     .then(res => {
  //       res.json()
  //       console.log(res.json())
  //     })
  //     .catch(this.handleError)
  // }


  public handleError(error: any) {
    console.error('An error occurred', error);
    return JSON.parse(error)

  }

}
