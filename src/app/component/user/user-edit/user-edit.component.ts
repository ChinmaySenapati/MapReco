import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'app/service/common.service';
import { UserService } from 'app/service/user.service';
import { User } from 'app/model/user';
import { Role } from 'app/model/role';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  uuid: string;
  user: User;
  userForm: FormGroup;
  roles: Role[];

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _commonService: CommonService, private _userService: UserService) {

    this.userForm = this.formBuilder.group({
      uuid: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
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

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.getUser(this.uuid);
    }
  }

  async getUser(id: string) {
    if (id != '') {
      let response = await this._userService.getUser(id).toPromise();
      if (response.message == 'success') {
        this.user = response.data.user;
        this.userForm.patchValue(this.user);
      }
    }
  }

  compareRole(r1: Role, r2: Role): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  async getRoles() {
    let response = await this._commonService.getRoles().toPromise();
    if (response.message == 'success') {
      this.roles = response.data.roles;
    }
  }

  async onSubmit() {
    let response = await this._userService.saveUser(this.userForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/Users');
    }
  }
}