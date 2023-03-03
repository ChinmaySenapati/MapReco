import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'app/service/common.service';
import { ClientService } from 'app/service/client.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private _router: Router, private formBuilder: FormBuilder, private _commonService: CommonService,
    private _clientService: ClientService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      uuid: [''],
      name: ['', Validators.required],
      code: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    let response = await this._clientService.saveClient(this.clientForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/Clients');
    }
  }
}