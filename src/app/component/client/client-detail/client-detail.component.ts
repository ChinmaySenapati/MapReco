import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'app/service/common.service';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';
import { State } from 'app/model/state';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  addressForm: FormGroup;
  uuid: string;
  isAddressUpdateClicked: boolean;
  client: Client;
  states: State[];

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _commonService: CommonService, private _clientService: ClientService) {
    this.isAddressUpdateClicked = false;
  }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      uuid: [''],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      client: this.formBuilder.group({
        uuid: ['']
      }),
      state: this.formBuilder.group({
        id: [''],
        name: ['']
      })
    });

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.clientDetails(this.uuid);
    }
  }

  async clientDetails(id: string) {
    if (id != '') {
      let response = await this._clientService.getClient(id).toPromise();
      if (response.message == 'success') {
        this.client = response.data.client;
        if (this.client.address != null && this.client.address.uuid != '') {
          this.addressForm.patchValue(this.client.address);
        }
      }
    }
  }

  compareState(s1: State, s2: State): boolean {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
  }

  updateAddressEvent(): void {
    this.isAddressUpdateClicked = !this.isAddressUpdateClicked;
    if (this.isAddressUpdateClicked) {
      if (this.client.address != null && this.client.address.uuid != '') {
        this.addressForm.get('uuid').setValue(this.client.address.uuid);
        this.addressForm.get('line1').setValue(this.client.address.line1);
        this.addressForm.get('line2').setValue(this.client.address.line2);
        this.addressForm.get('city').setValue(this.client.address.city);
        this.addressForm.get('state').get('id').setValue(this.client.address.state.id);
        this.addressForm.get('state').get('name').setValue(this.client.address.state.name);
        this.addressForm.get('pincode').setValue(this.client.address.pincode);
      }
    }
    this.getStates();
  }

  async getStates() {
    let response = await this._commonService.getStates().toPromise();
    if (response.message == 'success') {
      this.states = response.data.states;
    }
  }

  async updateAddress() {
    this.addressForm.get('client').get('uuid').setValue(this.client.uuid);
    let response = await this._clientService.updateAddress(this.addressForm.value).toPromise();
    if (response.message == 'success') {
      this.client.address = this.addressForm.value;
      this.isAddressUpdateClicked = false;
      this._router.navigateByUrl('/Client/Details/' + this.client.uuid);
    }
  }
}