import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ArchiveAddComponent } from './archive-add/archive-add.component';
import { ArchiveDetailComponent } from './archive-detail/archive-detail.component';
import { ArchiveEditComponent } from './archive-edit/archive-edit.component';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
 
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    ArchiveAddComponent,
    ArchiveDetailComponent,
    ArchiveEditComponent,
    ArchiveListComponent
  ],
  exports: [
    HeaderComponent,
    ArchiveAddComponent,
    ArchiveDetailComponent,
    ArchiveEditComponent,
    ArchiveListComponent,

  ]
})
export class ArchiveModule { }
