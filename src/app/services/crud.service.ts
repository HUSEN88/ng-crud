import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError } from 'rxjs/operators';
import {User} from '../model/user.model'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  apiurl = 'api/users';                 // Our created Data can be accessed here at api/users
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }                     //Injecting HTTP service to communicate with the data

  // get users list
  getUsers() {
    return this.http.get(this.apiurl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  //delete a user
  deleteUser(id: number) {
    return this.http.delete(this.apiurl + '/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  // get single user details
  getUser(id: number) {
    return this.http.get(this.apiurl + '/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  // add user
  createUser(user:User) {
    return this.http.post(this.apiurl, user, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }
}
