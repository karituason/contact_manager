import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user_detail/user-detail.component';
import { APIService } from './service/api.service';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { NotFoundComponent } from './shared/notFound.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    UserDetailComponent,
    ContactDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'admin', component:AdminComponent},
      {path:'user', component:UserComponent},
      {path:'user-detail', component:UserDetailComponent},
      {path:'contact-detail', component:ContactDetailComponent},
      {path:'', redirectTo:'login',pathMatch:'full'},
      {path:'**', component:NotFoundComponent}
    ])
  ],
  providers: [
    APIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
