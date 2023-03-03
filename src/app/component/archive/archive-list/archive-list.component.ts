import { Component, OnInit } from '@angular/core';
import { ArchiveService } from 'app/service/archive.service';
import { Reconciliation } from 'app/model/reconciliation';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css']
})
export class ArchiveListComponent implements OnInit {

  reconciliations: Reconciliation[];
 
  constructor(private _archiveService: ArchiveService) { }

  ngOnInit() {
    this.listArchives();
  }

  async listArchives() {
    
    let response = await this._archiveService.getArchives().toPromise(); 
    if (response.message == 'success') {
      this.reconciliations = response.data.reconciliations;
    }
  }

  async deleteArchive(uuid: string) {
    if (uuid != '' && confirm('Are you sure you want to delete?')) {
      let response = await this._archiveService.deleteReconciliation(uuid).toPromise();
      if (response.message == 'success') {
        this.listArchives();
      }
    }
  }

}