import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BackButtonDisableModule.forRoot({
            preserveScrollPosition: true,
        }),
    ],
    providers: [{ provide: ToastrService, useValue: ToastrService }],
    bootstrap: [AppComponent],
})
export class AppModule {}
