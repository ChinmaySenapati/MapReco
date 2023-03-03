import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/service/common.service';

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.css']
})
export class DocumentTypeEditComponent implements OnInit {

  uuid: string;
  documentType: DocumentType;
  documentTypeForm: FormGroup;

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _commonService: CommonService) { }

  ngOnInit() {
    this.documentTypeForm = this.formBuilder.group({
      uuid: [''],
      name: ['', Validators.required]
    });

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.getDocumentType(this.uuid);
    }
  }

  async getDocumentType(id: string) {
    if (id != '') {
      let response = await this._commonService.getDocumentType(id).toPromise();
      if (response.message == 'success') {
        this.documentType = response.data.documentType;
        this.documentTypeForm.patchValue(this.documentType);
      }
    }
  }

  async onSubmit() {
    let response = await this._commonService.saveDocumentType(this.documentTypeForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/DocumentTypes');
    }
  }
}