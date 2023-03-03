import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/service/common.service';
import { DocumentType } from 'app/model/document-type';

@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.css']
})
export class DocumentTypeListComponent implements OnInit {

  documentTypes: DocumentType[];

  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this.listDocumentTypes();
  }

  async listDocumentTypes() {
    let response = await this._commonService.getDocumentTypes().toPromise();
    if (response.message == 'success') {
      this.documentTypes = response.data.documentTypes;
    }
  }

  async deleteDocumentType(uuid: string) {
    if (uuid != '') {
      let response = await this._commonService.deleteDocumentType(uuid).toPromise();
      if (response.message == 'success') {
        this.ngOnInit();
      }
    }
  }
}