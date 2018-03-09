import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { APIService } from './service/api.service';
import { NotFoundComponent } from './shared/notFound.component';
import { AdminModule } from './admin/admin.module';
import { Httpprovider } from './service/httpprovider.service';
import { Userdetails } from './service/userdetails';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    UserModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
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
