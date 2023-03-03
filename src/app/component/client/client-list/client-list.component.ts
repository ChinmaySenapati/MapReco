import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[];

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
    this.listClients();
  }

  async listClients() {
    let response = await this._clientService.getClients().toPromise();
    if (response.message == 'success') {
      this.clients = response.data.clients;
    }
  }

  async deleteClient(uuid: string) {
    if (uuid != '') {
      let response = await this._clientService.deleteClient(uuid).toPromise();
      if (response.message == 'success') {
        this.ngOnInit();
      }
    }
  }
}