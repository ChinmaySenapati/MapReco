import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  user: User;
  userValidate: boolean;

  ngOnInit() {
    this.userValidate = true;
    localStorage.clear();
  }

  onSubmit(form: any) {
    this.userService.authenticateUser(form.email, form.password)
      .subscribe(res => {
        this.user = res['data'].user;
        if (this.user == null) {
          this.userValidate = false;
        }
        else {
          this.navigateToHome();
        }
      },
        err => console.log(err)
      );
  }

  navigateToHome() {
    const localStorageObject = {
      "auth_token": this.user.authToken,
      "name": this.user.name,
      "email": this.user.email,
      "role": this.user.role.code
    };
    localStorage.setItem('user', JSON.stringify(localStorageObject));

    if (this.user.email == '') {
      this.router.navigateByUrl('/Login');
    }
    else {
      if(this.user.role.code.toUpperCase() == 'ADM') {
        this.router.navigateByUrl('/Users');
      }
      else {
        this.router.navigateByUrl('/Dashboard');
      }
    }
  }
}