import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'app/service/common.service';
import { UserService } from 'app/service/user.service';
import { Role } from 'app/model/role';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  roles: Role[];

  constructor(private _router: Router, private formBuilder: FormBuilder, private _commonService: CommonService, 
    private _userService: UserService) { 

  }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      uuid: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });

    this.getRoles();
  }

  getRoles(): void {
    this._commonService.getRoles()
      .subscribe(res => { this.roles = res['data'].roles; },
        error => { console.log("Error :: " + error) });
  }

  onSubmit() {
    this._userService.saveUser(this.userForm.value)
      .subscribe(() => {
        this._router.navigateByUrl('/Users');
      });
  }
}