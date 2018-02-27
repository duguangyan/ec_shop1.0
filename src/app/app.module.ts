import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {ROUTES} from '../router/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { ExplainComponent } from './pages/home/explain/explain.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {HttpService} from './service/http.service';
import { HttpClientModule } from '@angular/common/http';
import {TotastService} from './service/totast.service';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { RegisterComponent } from './login/register/register.component';
import { ProtocolComponent } from './login/register/protocol/protocol.component';
import { PaymentComponent } from './payment/payment.component';
import { PayDoingComponent } from './payment/pay-doing/pay-doing.component';
import { PaySuccessComponent } from './payment/pay-success/pay-success.component';
import { OrderListDetailComponent } from './pages/settings/order-list-detail/order-list-detail.component';
import { OrderListComponent } from './pages/settings/order-list/order-list.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { PopupComponent } from './pages/common/dialog/popup/popup.component';
import { ShopComponent } from './pages/shop/shop.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    MainComponent,
    SearchComponent,
    ExplainComponent,
    FooterComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    ProtocolComponent,
    PaymentComponent,
    PayDoingComponent,
    PaySuccessComponent,
    OrderListDetailComponent,
    OrderListComponent,
    PopupComponent,
    ShopComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    HttpService,
    TotastService,
    { provide: LocationStrategy, useClass: HashLocationStrategy, }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
