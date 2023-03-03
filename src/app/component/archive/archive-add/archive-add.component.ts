import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'app/service/common.service';
import { ClientService } from 'app/service/client.service';
import { ArchiveService } from 'app/service/archive.service';
import { Client } from 'app/model/client';
import { ClientCategory } from 'app/model/client-category';
import { Partner } from 'app/model/partner';

@Component({
  selector: 'app-archive-add',
  templateUrl: './archive-add.component.html',
  styleUrls: ['./archive-add.component.css']
})
export class ArchiveAddComponent implements OnInit {

  archiveForm: FormGroup;
  clients: Client[];
  categories: ClientCategory[];
  partners: Partner[];
  isArchiveValid: boolean;

  constructor(private _router: Router, private formBuilder: FormBuilder, private _commonService: CommonService,
    private _clientService: ClientService, private _archiveService: ArchiveService) { }

  ngOnInit() {
    this.archiveForm = this.formBuilder.group({
      uuid: [''],
      client: ['', [Validators.required]],
      partner: ['', [Validators.required]],
      fromDate: [new Date()],
      toDate: [new Date()]
    });

    this.isArchiveValid = true;
    this.listClients();
  }

  listClients(): void {
    this._clientService.getClients()
      .subscribe(res => { this.clients = res['data'].clients; },
        error => { console.log("Error :: " + error) });
  }

  getCategories(clientUUID: string) {
    this.partners = [];
    if (clientUUID != '') {
      this._clientService.getCategories(clientUUID)
        .subscribe(res => {
          this.categories = res['data'].clientCategories;
        });
    }
  }

  getPartners(catgeoryUUID: string) {
    if (catgeoryUUID != '') {
      this._clientService.getPartnersByCatgeory(catgeoryUUID)
        .subscribe(res => {
          this.partners = res['data'].partners;
        });
    }
  }

  onSubmit() {
    this.isArchiveValid = true;

    var validateionObject = {
      'id': '',
      'client_id': this.archiveForm.get('client').value,
      'partner_id': this.archiveForm.get('partner').value,
      'from_date': this.archiveForm.get('fromDate').value,
      'to_date': this.archiveForm.get('toDate').value
    };

    this._archiveService.validateReconciliation(JSON.stringify(validateionObject))
      .subscribe(data => {
        if (data.message == 'success') {
          var reconciliationObject = {
            'uuid': '',
            'client': { 'uuid': this.archiveForm.get('client').value },
            'partner': { 'uuid': this.archiveForm.get('partner').value },
            'fromDate': this.archiveForm.get('fromDate').value,
            'toDate': this.archiveForm.get('toDate').value
          };

          this._archiveService.saveReconciliation(JSON.stringify(reconciliationObject))
            .subscribe(data => {
              this._router.navigateByUrl('/Archive/Details/' + data.data.reconciliation_id.id);
            });
        }
        else {
          this.isArchiveValid = false;
        }
      });
  }
}