import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/service/common.service';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';
import { ClientCategory } from 'app/model/client-category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  uuid: string;
  client: Client;
  categories: ClientCategory[];

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
        this.listCategories(this.client.uuid);
      }
    }
  }

  async listCategories(id: string) {
    let response = await this._clientService.getCategories(id).toPromise();
    if (response.message == 'success') {
      this.categories = response.data.clientCategories;
    }
  }

  async deleteCategory(id: string) {
    if (id != '') {
      let response = await this._clientService.deleteCategory(id).toPromise();
      if (response.message == 'success') {
        this.ngOnInit();
      }
    }
  }
}