import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardListComponent } from './card-list/card-list.component';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import {Route, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { CardItemComponent } from './card-item/card-item.component';
import { RegisterComponent } from './auth/register/register.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {NonAuthGuard} from './auth/guards/non-auth.guard';
import { LoginOrganizationComponent } from './auth/login-organization/login-organization.component';
import { RegisterOrganizationComponent } from './auth/register-organization/register-organization.component';
import { CardListOrganizationComponent } from './card-list-organization/card-list-organization.component';
import { CardListAnnounceComponent } from './card-list-announce/card-list-announce.component';
import { PostReactiveFormComponent } from './post-forms/post-reactive-form/post-reactive-form.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { PostReactiveProfileComponent } from './post-forms/post-reactive-profile/post-reactive-profile.component';
import { PostReactiveOrganizationProfileComponent } from './post-forms/post-reactive-organization-profile/post-reactive-organization-profile.component';
import { OrganizationProfileComponent } from './auth/organization-profile/organization-profile.component';
import { CarListAnnounceAppliedComponent } from './car-list-announce-applied/car-list-announce-applied.component';

const routes: Route[] = [

  {
    path: 'loginOrganization',
    component: LoginOrganizationComponent,
    canActivate : [NonAuthGuard]
  },
  {
    path: 'registerOrganization',
    component: RegisterOrganizationComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [NonAuthGuard]

  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate : [NonAuthGuard]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'user-profile/edit/:id',
    component: PostReactiveProfileComponent

  },
  {
    path: 'organization-profile',
    component: OrganizationProfileComponent
  },
  {
    path: 'organization-profile/edit/:id',
    component: PostReactiveOrganizationProfileComponent
  },
  {
    path: 'announcements',
    component: CardListAnnounceComponent,
    // canActivate : [AuthGuard]
  },

  {
   path: 'announcements/create',
    component: PostReactiveFormComponent
  },
  {
    path: 'announcements/edit/:id',
    component: PostReactiveFormComponent
  },
  {
    path: 'announcements-applied',
    component: CarListAnnounceAppliedComponent
  }
 /* {
    path: 'announcement',
    component: CardListOrganizationComponent
  }*/
 /* {
   path: 'organization-login',
   component: CardListComponent
  }*/
];

@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    LoginComponent,
    HeaderComponent,
    MainComponent,
    CardItemComponent,
    RegisterComponent,
    LoginOrganizationComponent,
    RegisterOrganizationComponent,
    CardListOrganizationComponent,
    CardListAnnounceComponent,
    PostReactiveFormComponent,
    UserProfileComponent,
    PostReactiveProfileComponent,
    PostReactiveOrganizationProfileComponent,
    OrganizationProfileComponent,
    CarListAnnounceAppliedComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
