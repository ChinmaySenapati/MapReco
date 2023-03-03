import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/service/common.service';

@Component({
  selector: 'app-document-type-add',
  templateUrl: './document-type-add.component.html',
  styleUrls: ['./document-type-add.component.css']
})
export class DocumentTypeAddComponent implements OnInit {

  documentTypeForm: FormGroup;

  constructor(private _router: Router, private formBuilder: FormBuilder, private _commonService: CommonService) { }

  ngOnInit() {
    this.documentTypeForm = this.formBuilder.group({
      uuid: [''],
      name: ['', Validators.required]
    });
  }

  async onSubmit() {
    let response = await this._commonService.saveDocumentType(this.documentTypeForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/DocumentTypes');
    }
  }
}