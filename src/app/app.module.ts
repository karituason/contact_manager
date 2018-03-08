import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { APIService } from './service/api.service';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { NotFoundComponent } from './shared/notFound.component';
import { AdminModule } from './admin/admin.module';
import { Httpprovider } from './service/httpprovider.service';
import { Userdetails } from './service/userdetails';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ContactDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'user', component:UserComponent},
      {path:'contact-detail', component:ContactDetailComponent},
      {path:'', redirectTo:'login',pathMatch:'full'},
      {path:'**', component:NotFoundComponent}
    ])
  ],
  providers: [
    APIService,Httpprovider, Userdetails
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
