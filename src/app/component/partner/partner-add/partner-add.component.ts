import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';
import { ClientCategory } from 'app/model/client-category';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.css']
})
export class PartnerAddComponent implements OnInit {

  uuid: string;
  client: Client;
  categories: ClientCategory[];
  partnerForm: FormGroup;

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _clientService: ClientService) { }

  ngOnInit() {
    this.partnerForm = this.formBuilder.group({
      uuid: [''],
      name: ['', [Validators.required]],
      clientCategory: ['', [Validators.required]]
    }); 

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.clientDetails(this.uuid);
    }
  }

  async clientDetails(id: string) {
    if (id != '') {
      let response = await this._clientService.getClient(id).toPromise();
      if (response.message == 'success') {
        this.client = response.data.client;
        this.getCategories(this.client.uuid);
      }
    }
  }

  async getCategories(uuid) {
    let response = await this._clientService.getCategories(uuid).toPromise();
    if (response.message == 'success') {
      this.categories = response.data.clientCategories;
    }
  }

  async onSubmit() {
    let response = await this._clientService.savePartner(this.partnerForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/Client/Partners/' + this.client.uuid);
    }
  }
}