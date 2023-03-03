import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/service/common.service';
import { ArchiveService } from 'app/service/archive.service';
import { Reconciliation } from 'app/model/reconciliation';
import { Client } from 'app/model/client';

@Component({
  selector: 'app-archive-detail',
  templateUrl: './archive-detail.component.html',
  styleUrls: ['./archive-detail.component.css']
})
export class ArchiveDetailComponent implements OnInit {

  userRole: string;
  documentUploadForm: FormGroup;
  uuid: string;
  reconciliation: Reconciliation;
  documentTypes: DocumentType[];
  isUploadDocumentClicked: boolean;
  fileToUpload: File;
  client: Client;

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _commonService: CommonService, private _archiveService: ArchiveService) { }

  ngOnInit() {

    if (localStorage.getItem('user') != null) {
      let localStorageObject = JSON.parse(localStorage.getItem('user'));
      console.log(localStorageObject);
      if (localStorageObject != null) {
        this.userRole = localStorageObject.role;
      }
    }

    this.documentUploadForm = this.formBuilder.group({
      documentType: ['', Validators.required]
    });

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.reconciliationDetails(this.uuid);
      this.listDocumentTypes();
    }
  }

  async reconciliationDetails(id: string) {
    if (id != '') {
      let response = await this._archiveService.getReconciliation(id).toPromise();
      if (response.message == 'success') {
        this.reconciliation = response.data.reconciliation;
      }
    }
  }

  async listDocumentTypes() {
    let response = await this._commonService.getDocumentTypes().toPromise();
    if (response.message == 'success') {
      this.documentTypes = response.data.documentTypes;
    }
  }

  uploadDocumentEvent(): void {
    this.isUploadDocumentClicked = !this.isUploadDocumentClicked;
    this.listDocumentTypes();
  }

  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.fileToUpload = files.item(0);
    }
  }

  async onSubmit() {
    let formData = new FormData();
    formData.append('files', this.fileToUpload);
    formData.append('filename', this.fileToUpload.name);

    let response = await this._archiveService.uploadDocument(this.uuid, this.documentUploadForm.get('documentType').value, formData).toPromise();
    if (response.message == 'success') {
      this.isUploadDocumentClicked = false;
      this.reconciliationDetails(this.uuid);
    }
  }

  async downloadDocument(uuid: string, fileName: string) {
    if (uuid != '') {
      let response = await this._archiveService.downloadDocument(uuid).toPromise();
      if (response) {
        var blob = new Blob([response], { type: "application/octet-stream" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
      }
    }
  }

  async deleteDocument(uuid: string) {
    if (uuid != '' && confirm('Are you sure you want to delete?')) {
      let response = await this._archiveService.deleteDocument(uuid).toPromise();
      if (response.message == 'success') {
        this.reconciliationDetails(this.uuid);
      }
    }
  }

  async sendForApproval(uuid: string) {
    if (uuid != '') {
      let response = await this._archiveService.sendReconciliationForApproval(uuid).toPromise();
      if (response.message == 'success') {
        this.reconciliationDetails(this.uuid);
      }
    }
  }

  async approveArchive(uuid: string) {
    if (uuid != '') {
      let response = await this._archiveService.approveReconciliation(uuid).toPromise();
      if (response.message == 'success') {
        this.reconciliationDetails(this.uuid);
      }
    }
  }

  async rejectArchive(uuid: string) {
    if (uuid != '' && confirm('Are you sure you want to reject?')) {
      let response = await this._archiveService.rejectReconciliation(uuid).toPromise();
      if (response.message == 'success') {
        this.reconciliationDetails(this.uuid);
      }
    }
  }
}