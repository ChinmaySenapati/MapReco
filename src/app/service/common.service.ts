import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CommonService {
  constructor(private _apiService: ApiService) { }

  getRoles() {
    return this._apiService.get('/roles');
  }

  getStates() {
    return this._apiService.get('/states');
  }

  getDocumentTypes() {
    return this._apiService.get('/document-types');
  }

  getDocumentType(id: string) {
    return this._apiService.get('/document-type/get/' + id);
  }

  saveDocumentType(documentType: DocumentType) {
    return this._apiService.post('/document-type/save', JSON.stringify(documentType));
  }

  deleteDocumentType(id: string) {
    return this._apiService.delete('/document-type/delete/' + id);
  }
}