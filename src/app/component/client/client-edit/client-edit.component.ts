import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'app/service/common.service';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  uuid: string;
  client: Client;
  clientForm: FormGroup;

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _commonService: CommonService, private _clientService: ClientService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      uuid: [''],
      name: ['', Validators.required],
      code: ['', [Validators.required]]
    });

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.getClient(this.uuid);
    }
  }

  async getClient(id: string) {
    if (id != '') {
      let response = await this._clientService.getClient(id).toPromise();
      //console.log(response);
      if (response.message == 'success') {
        this.client = response.data.client;
        this.clientForm.patchValue(this.client);
      }
    }
  }

  async onSubmit() {
    let response = await this._clientService.saveClient(this.clientForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/Clients');
    }
  }
}