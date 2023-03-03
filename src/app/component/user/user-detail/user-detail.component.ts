import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/service/user.service';
import { User } from 'app/model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  uuid: string;
  user: User;

  constructor(private _route: ActivatedRoute, private _userService: UserService) { }

  ngOnInit() {
    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.userDetails(this.uuid);
    }
  }

  async userDetails(id: string) {
    if (id != '') {
      let response = await this._userService.getUser(id).toPromise();
      if (response.message == 'success') {
        this.user = response.data.user;
      }
    }
  }
}