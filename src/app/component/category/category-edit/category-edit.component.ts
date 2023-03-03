import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';
import { ClientCategory } from 'app/model/client-category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  uuid: string;
  clientUUID: string;
  client: Client;
  category: ClientCategory;
  categoryForm: FormGroup;

  constructor(private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder,
    private _clientService: ClientService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      uuid: [''],
      name: ['', Validators.required],
      code: ['', [Validators.required]],
      client: this.formBuilder.group({
        uuid: ['']
      })
    });

    this.clientUUID = this._route.snapshot.paramMap.get('clientUUID');
    if (this.clientUUID != '') {
      this.clientDetails(this.clientUUID);
    }

    this.uuid = this._route.snapshot.paramMap.get('uuid');
    if (this.uuid != '') {
      this.categoryDetails(this.uuid);
    }
  }

  async clientDetails(id: string) {
    if (id != '') {
      let response = await this._clientService.getClient(id).toPromise();
      if (response.message == 'success') {
        this.client = response.data.client;
      }
    }
  }

  async categoryDetails(id: string) {
    if (id != '') {
      let response = await this._clientService.getCategory(id).toPromise();
      if (response.message == 'success') {
        this.category = response.data.clientCategory;
        this.categoryForm.patchValue(this.category);
      }
    }
  }

  async onSubmit() {
    let response = await this._clientService.saveCategory(this.categoryForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/Client/Categories/' + this.client.uuid);
    }
  }
}