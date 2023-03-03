import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { JwPaginationComponent } from "jw-angular-pagination";
import {Ng2PaginationModule} from 'ng2-pagination';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './util/auth-intercepter.service';

import { AuthGuardService } from './service/auth-guard.service';
import { ApiService } from './service/api.service';
import { CommonService } from './service/common.service';
import { UserService } from './service/user.service';
import { ClientService } from './service/client.service';
import { ArchiveService } from './service/archive.service';


import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DocumentTypeListComponent } from './component/document-type/document-type-list/document-type-list.component';
import { DocumentTypeAddComponent } from './component/document-type/document-type-add/document-type-add.component';
import { DocumentTypeEditComponent } from './component/document-type/document-type-edit/document-type-edit.component';
import { ClientListComponent } from './component/client/client-list/client-list.component';
import { ClientDetailComponent } from './component/client/client-detail/client-detail.component';
import { ClientAddComponent } from './component/client/client-add/client-add.component';
import { ClientEditComponent } from './component/client/client-edit/client-edit.component';
import { CategoryListComponent } from './component/category/category-list/category-list.component';
import { CategoryAddComponent } from './component/category/category-add/category-add.component';
import { CategoryEditComponent } from './component/category/category-edit/category-edit.component';
import { PartnerListComponent } from './component/partner/partner-list/partner-list.component';
import { PartnerAddComponent } from './component/partner/partner-add/partner-add.component';
import { PartnerEditComponent } from './component/partner/partner-edit/partner-edit.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';
import { UserAddComponent } from './component/user/user-add/user-add.component';
import { UserDetailComponent } from './component/user/user-detail/user-detail.component';
import { ArchiveDetailComponent } from './component/archive/archive-detail/archive-detail.component';
import { ArchiveAddComponent } from './component/archive/archive-add/archive-add.component';
import { ArchiveEditComponent } from './component/archive/archive-edit/archive-edit.component';
import { ArchiveListComponent } from './component/archive/archive-list/archive-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JwPaginationComponent,
    ArchiveAddComponent,
    ArchiveDetailComponent,
    ArchiveEditComponent,
    ArchiveListComponent,
    HeaderComponent,
    MenuComponent,
    UserListComponent,
    UserDetailComponent,
    UserAddComponent,
    UserEditComponent,
    DashboardComponent,
    DocumentTypeListComponent,
    DocumentTypeAddComponent,
    DocumentTypeEditComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientAddComponent,
    ClientEditComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    PartnerListComponent,
    PartnerAddComponent,
    PartnerEditComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuardService,
    ApiService,
    CommonService,
    UserService,
    ClientService,
    ArchiveService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }