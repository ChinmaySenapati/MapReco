import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/service/common.service';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';
import { Partner } from 'app/model/partner';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {

  uuid: string;
  client: Client;
  partners: Partner[];

  constructor(private _route: ActivatedRoute, private _commonService: CommonService,
    private _clientService: ClientService) { }

  ngOnInit() {
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
        this.listPartners(this.client.uuid);
      }
    }
  }

  async listPartners(id: string) {
    let response = await this._clientService.getPartners(this.client.uuid).toPromise();
    if (response.message == 'success') {
      this.partners = response.data.partners;
    }
  }

  async deletePartner(id: string) {
    if (id != '') {
      let response = await this._clientService.deletePartner(id).toPromise();
      if (response.message == 'success') {
        this.ngOnInit();
      }
    }
  }
}