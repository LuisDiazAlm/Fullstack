import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from './modules/client/client.module';
import { CommonLayoutComponent } from './modules/common-layout/common-layout.component';
import { TemplateModule } from './modules/template/template.module';
import { AuthLayoutComponent } from './modules/auth-layout/auth-layout.component';

import { HttpClientModule } from '@angular/common/http';
 import { HttpModule } from '@angular/http';

// import {ToastyModule} from 'ng2-toasty';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasepathInterceptor } from './core/interceptor/basepath.interceptor';
import { AuthorizationInterceptor } from './core/interceptor/authorization.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    ClientModule,
    HttpClientModule,
    HttpModule
    // ToastyModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: BasepathInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
