import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserManagementComponent } from './admin/user-management/user-management.component';

export const routes: Routes = [
  { path: '', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'project-form/:id', component: ProjectFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
