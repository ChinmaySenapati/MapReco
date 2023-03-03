import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ApiService } from './api.service';

@Injectable()
export class ArchiveService {
  
  constructor(private _apiService: ApiService) { }

  getArchives() {
    return this._apiService.get('/reconciliation/reconciliations');
  }

  getReconciliation(id: string) {
    return this._apiService.get('/reconciliation/get/' + id);
  }

  saveReconciliation(reconciliationString: string) {
    return this._apiService.post('/reconciliation/save', reconciliationString);
  }

  updateReconciliation(id: string, reconciliationString: string) {
    return this._apiService.post('/reconciliation/update/' +  id, reconciliationString);
  }

  deleteReconciliation(id: string) {
    return this._apiService.delete('/reconciliation/delete/' + id);
  }

  validateReconciliation(reconciliationString: string) {
    return this._apiService.post('/reconciliation/validate', reconciliationString);
  }

  sendReconciliationForApproval(id: string) {
    return this._apiService.get('/reconciliation/send-for-approval/' + id);
  }

  approveReconciliation(id: string) {
    return this._apiService.get('/reconciliation/approve/' + id);
  }

  rejectReconciliation(id: string) {
    return this._apiService.get('/reconciliation/reject/' + id);
  }

  uploadDocument(reconciliationId: string, documentTypeId: string, formData: any) {
    return this._apiService.postData('/reconciliation/upload-document?reconciliation_id='+reconciliationId + "&document_type_id=" + documentTypeId, formData);
  }

  downloadDocument(id: string) {
    return this._apiService.getFile('/reconciliation/download-document/' + id);
  }

  deleteDocument(id: string) {
    return this._apiService.delete('/reconciliation/delete-document/' + id);
  }
}