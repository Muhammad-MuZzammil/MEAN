import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http'; // Http Module
import { TodoService } from './services/todo.service'; //Service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tasks = [];

  // Global Variables
  show: boolean = false;
  private addTodo: string;
  globalTask: string;

  constructor(
    // Service Injecttion
    private todoService: TodoService,
    private http: Http) { }

  ngOnInit() { }

  // Get All Todos
  getTodos() {
    this.todoService.getTodos(this.todoService.todosUrl + "/getTodos", this.todoService.headers)
      .then(todos => {
        this.tasks = todos;
        console.log('todos', todos);
      });
  }
  // Add Todos
  addTask() {
    console.log(this.addTodo);
    let obj = {
      task: this.addTodo
    }
    // Server Request
    this.todoService.create(this.todoService.todosUrl + "/postTodos", obj, this.todoService.headers)
    this.addTodo = '';
  }

  // Edit Todos
  editTodo(addTodo, index, task) {
    this.show = true;
    this.addTodo = task.task

    this.tasks.splice(index, 1)
    console.log(task._id);
    this.globalTask = task._id;

  }
  // Update Todos
  updateTask(addTodo) {
    this.show = false;

    let obj = {
      tid: this.globalTask,      
      udTodo: this.addTodo
    }
    // Server Request

    this.todoService.update(this.todoService.todosUrl + "/updateTodos", obj, this.todoService.headers)
      .then(res => {
        res = obj;
        console.log(res);

      })

    // console.log(obj);

    this.addTodo = '';

  }
  // Delete Todos
  deleteTodo(index, task) {
    let obj = JSON.stringify({
      Todo: task
    });

    // Server Request
    this.http.delete(this.todoService.todosUrl + "/deleteTodos", new RequestOptions({
      headers: this.todoService.headers,
      body: obj
    }))
      .toPromise()
      .then(res => {
        res.json()
        console.log("Response", res.json())
        this.tasks.splice(index, 1)
      })
      .catch(this.todoService.handleError)
  }


}
