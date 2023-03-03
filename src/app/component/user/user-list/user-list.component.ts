import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/service/user.service';
import { User } from 'app/model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.listUsers();
  }

  async listUsers() {
    let response = await this._userService.getUsers().toPromise();
    if (response.message == 'success') {
      this.users = response.data.users;
      console.log(this.users);
    }
  }

  async deleteUser(id: string) {
    if (id != '') {
      let response = await this._userService.deleteUser(id).toPromise();
      if (response.message == 'success') {
        this.ngOnInit();
      }
    }
  }
}