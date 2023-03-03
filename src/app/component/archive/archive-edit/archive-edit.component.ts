import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'app/service/common.service';
import { ArchiveService } from 'app/service/archive.service';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';
import { ClientCategory } from 'app/model/client-category';
import { Partner } from 'app/model/partner';
import { Reconciliation } from 'app/model/reconciliation';
import { UserService } from 'app/service/user.service';


@Component({
  selector: 'app-archive-edit',
  templateUrl: './archive-edit.component.html',
  styleUrls: ['./archive-edit.component.css']
})
export class ArchiveEditComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder, private _userService: UserService,
    private _commonService: CommonService, private _clientService: ClientService, private _archiveService: ArchiveService) { }

  // userRole: string;
  // uuid: string;
  // client: Client[];
  // partner: Partner[];
  // reconciliation: Reconciliation;
  // category: ClientCategory[];
  // archiveForm: FormGroup;
  // isArchiveValid: boolean;
  uuid: string;
  archiveForm: FormGroup;
  clients: Client[];
  categories: ClientCategory[];
  partners: Partner[];
  isArchiveValid: boolean;

  user: string;

  ngOnInit() {
    this.user = this._userService.getUser('uuid');
  console.log(this.user);
    this.archiveForm = this.formBuilder.group({
      uuid: [''],
      client:  ['', [Validators.required]],
      partner: ['', [Validators.required]],
      fromDate: [new Date()],
      toDate: [new Date()]
    });

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    this.isArchiveValid = true;
    this.listClients();
    }

    // ${this.archiveForm.value.client}

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
          console.log(this.partners);
        }, error => { console.log("Error :: " + error)});
    }
  }

    onSubmit() {
    this.isArchiveValid = true;
  
    var validateionObject = {
      'id': this.archiveForm.get('uuid').value,
      'client_id': this.archiveForm.get('client').value,
      'partner_id': this.archiveForm.get('partner').value,
      'from_date': this.archiveForm.get('fromDate').value,
      'to_date': this.archiveForm.get('toDate').value
    };

    this._archiveService.validateReconciliation(JSON.stringify(validateionObject))
      .subscribe(data => {
        if (data.message == 'success') {
          var reconciliationObject = {
            'uuid': this._route.snapshot.paramMap.get('uuid'),
            'client': { 'uuid': this.archiveForm.get('client').value },
            'partner': { 'uuid': this.archiveForm.get('partner').value },
            'fromDate': this.archiveForm.get('fromDate').value,
            'toDate': this.archiveForm.get('toDate').value
          };
         
          this._archiveService.updateReconciliation(this.uuid,JSON.stringify(reconciliationObject))
            .subscribe(data => {
              this._router.navigateByUrl('/Archive/Details/' + data.data.id);
           
            });
        }
        else {
          this.isArchiveValid = false;
        }
      });
  }

  // user = this._userService
  // .getUser()
  // .pipe(tap(user => this.archiveForm.patchValue(user)));
  
 

}