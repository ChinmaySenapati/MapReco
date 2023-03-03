import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApiService } from './api.service';
import { User } from '../model/user';

@Injectable()
export class UserService {

  constructor(private _apiService: ApiService) { }

  authenticateUser(email: string, password: string): Observable<User> {
    var authParams = {
      "email": email,
      "password": password
    };

    return this._apiService.post('/authenticate/user', JSON.stringify(authParams));
  }

  getUsers() {
    return this._apiService.get('/user/list');
  }

  getUser(id: string) {
    return this._apiService.get('/user/get/' + id);
  }

  saveUser(user: User) {
    return this._apiService.post('/user/save', JSON.stringify(user));
  }

  deleteUser(id: string) {
    return this._apiService.delete('/user/delete/' + id);
  }
}