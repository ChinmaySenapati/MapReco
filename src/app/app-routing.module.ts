import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './service/auth-guard.service';

import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { UserDetailComponent } from './component/user/user-detail/user-detail.component';
import { UserAddComponent } from './component/user/user-add/user-add.component';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';
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
import { ArchiveListComponent } from './component/archive/archive-list/archive-list.component';
import { ArchiveDetailComponent } from './component/archive/archive-detail/archive-detail.component';
import { ArchiveAddComponent } from './component/archive/archive-add/archive-add.component';
import { ArchiveEditComponent } from './component/archive/archive-edit/archive-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent  },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'Users', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'User/Details/:uuid', component: UserDetailComponent, canActivate: [AuthGuardService] },
  { path: 'User/Add', component: UserAddComponent, canActivate: [AuthGuardService] },
  { path: 'User/Edit/:uuid', component: UserEditComponent, canActivate: [AuthGuardService] },
  { path: 'DocumentTypes', component: DocumentTypeListComponent, canActivate: [AuthGuardService] },
  { path: 'DocumentType/Add', component: DocumentTypeAddComponent, canActivate: [AuthGuardService] },
  { path: 'DocumentType/Edit/:uuid', component: DocumentTypeEditComponent, canActivate: [AuthGuardService] },
  { path: 'Clients', component: ClientListComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Details/:uuid', component: ClientDetailComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Add', component: ClientAddComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Edit/:uuid', component: ClientEditComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Categories/:uuid', component: CategoryListComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Category/Add/:uuid', component: CategoryAddComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Category/Edit/:clientUUID/:uuid', component: CategoryEditComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Partners/:uuid', component: PartnerListComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Partner/Add/:uuid', component: PartnerAddComponent, canActivate: [AuthGuardService] },
  { path: 'Client/Partner/Edit/:clientUUID/:uuid', component: PartnerEditComponent, canActivate: [AuthGuardService] },
  { path: 'Archives', component: ArchiveListComponent, canActivate: [AuthGuardService] },
  { path: 'Archive/Details/:uuid', component: ArchiveDetailComponent, canActivate: [AuthGuardService] },
  { path: 'Archive/Add', component: ArchiveAddComponent, canActivate: [AuthGuardService] },
  { path: 'Archive/Edit/:uuid', component: ArchiveEditComponent, canActivate: [AuthGuardService] },
 { path: 'Archive/Update/:uuid', component: ArchiveEditComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }