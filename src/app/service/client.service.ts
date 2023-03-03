import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Client } from '../model/client';
import { ClientAddress } from 'app/model/client-address';
import { ClientCategory } from 'app/model/client-category';
import { Partner } from 'app/model/partner';

@Injectable()
export class ClientService {

  constructor(private _apiService: ApiService) { }

  getClients() {
    return this._apiService.get('/client/list');
  }

  getClient(id: string) {
    return this._apiService.get('/client/get/' + id);
  }

  saveClient(client: Client) {
    return this._apiService.post('/client/save', JSON.stringify(client));
  }

  deleteClient(id: string) {
    return this._apiService.delete('/client/delete/' + id);
  }

  updateAddress(address: ClientAddress) {
    return this._apiService.post('/client/address/update', JSON.stringify(address));
  }

  getCategories(uuid: string) {
    return this._apiService.get('/client/category/list/' + uuid);
  }

  getCategory(uuid: string) {
    return this._apiService.get('/client/category/get/' + uuid);
  }

  saveCategory(clientCategory: ClientCategory) {
    return this._apiService.post('/client/category/save', JSON.stringify(clientCategory));
  }

  deleteCategory(uuid: string) {
    return this._apiService.delete('/client/category/delete/' + uuid);
  }

  getPartners(uuid: string) {
    return this._apiService.get('/client/partner/list/' + uuid);
  }

  getPartnersByCatgeory(uuid: string) {
    return this._apiService.get('/client/category/partner/list/' + uuid);
  }

  getPartner(uuid: string) {
    return this._apiService.get('/client/partner/get/' + uuid);
  }

  savePartner(partner: Partner) {
    return this._apiService.post('/client/partner/save', JSON.stringify(partner));
  }

  deletePartner(uuid: string) {
    return this._apiService.delete('/client/partner/delete/' + uuid);
  }
}