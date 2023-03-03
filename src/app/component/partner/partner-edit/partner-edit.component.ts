import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';
import { ClientCategory } from 'app/model/client-category';
import { Partner } from 'app/model/partner';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css']
})
export class PartnerEditComponent implements OnInit {

  uuid: string;
  clientUUID: string;
  client: Client;
  partner: Partner;
  categories: ClientCategory[];
  partnerForm: FormGroup;

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _clientService: ClientService) { }

  ngOnInit() {
    this.partnerForm = this.formBuilder.group({
      uuid: [''],
      name: ['', [Validators.required]]
    }); 

    this.clientUUID = this._route.snapshot.paramMap.get('clientUUID');
    if (this.clientUUID != '') {
      this.clientDetails(this.clientUUID);
    }

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.partnerDetails(this.uuid);
    }
  }

  async clientDetails(id: string) {
    if (id != '') {
      let response = await this._clientService.getClient(id).toPromise();
      if (response.message == 'success') {
        this.client = response.data.client;
      }
    }
  }

  async partnerDetails(id: string) {
    if (id != '') {
      let response = await this._clientService.getPartner(id).toPromise();
      if (response.message == 'success') {
        this.partner = response.data.partner;
        this.partnerForm.patchValue(this.partner);
      }
    }
  }

  async onSubmit() {
    let response = await this._clientService.savePartner(this.partnerForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/Client/Partners/' + this.client.uuid);
    }
  }
}