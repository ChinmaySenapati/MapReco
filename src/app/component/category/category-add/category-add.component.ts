import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/service/client.service';
import { Client } from 'app/model/client';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  uuid: string;
  client: Client;
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
      }
    }
  }

  async onSubmit() {
    this.categoryForm.get('client').get('uuid').setValue(this.client.uuid);
    let response = await this._clientService.saveCategory(this.categoryForm.value).toPromise();
    if (response.message == 'success') {
      this._router.navigateByUrl('/Client/Categories/' + this.client.uuid);
    }    
  }
}