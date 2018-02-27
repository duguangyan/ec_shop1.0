import {SettingsComponent} from '../app/pages/settings/settings.component';
import {Routes} from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {MainComponent} from '../app/main/main.component';
import {HomeComponent} from '../app/pages/home/home.component';
import {SearchComponent} from '../app/pages/search/search.component';
import {ExplainComponent} from '../app/pages/home/explain/explain.component';
import {ForgetPasswordComponent} from '../app/login/forget-password/forget-password.component';
import {RegisterComponent} from '../app/login/register/register.component';
import {ProtocolComponent} from '../app/login/register/protocol/protocol.component';
import {PaymentComponent} from '../app/payment/payment.component';
import {PayDoingComponent} from '../app/payment/pay-doing/pay-doing.component';
import {PaySuccessComponent} from '../app/payment/pay-success/pay-success.component';
import {OrderListDetailComponent} from '../app/pages/settings/order-list-detail/order-list-detail.component';
import {OrderListComponent} from '../app/pages/settings/order-list/order-list.component';
import {ShopComponent} from '../app/pages/shop/shop.component';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'protocol',
    component: ProtocolComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'paydo',
    component: PayDoingComponent,
  },
  {
    path: 'paysuccess',
    component: PaySuccessComponent,
  },
  {
    path: 'orderlistdetail',
    component: OrderListDetailComponent,
  },
  {
    path: 'orderlist',
    component: OrderListComponent,
  },
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home-explain',
    component: ExplainComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
  }

];
