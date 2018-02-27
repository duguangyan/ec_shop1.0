import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
import {TotastService} from './totast.service';

@Injectable()
export class HttpService {
  public API_ENDPOINT :any ;
  constructor(public http: HttpClient,
              public router: Router,
              public totastService: TotastService) {
    /*this.API_ENDPOINT = 'http://120.77.209.176:38000';*/
    this.API_ENDPOINT = 'https://api.yidap.com';
  }

  //是否登录
  isLogin(){
    if(!Cookie.load('username')){
      this.router.navigate(['login']);
      return false;
    }
  }
  // get请求
  get(url,params,callblack){
    //this.isLogin();
    this.http.get(this.API_ENDPOINT+url,params).subscribe((res:any)=>{
      if(res.code === -401){
        this.router.navigate(['login']);
        return;
      }else if(res.code>=0){
        callblack(res);
      }else{
        this.totastService.waring(res.msg);
      }
    });

  }
  //post请求
  post(url,params,callblack){
    //this.isLogin();
    this.http.post(this.API_ENDPOINT+url,params).subscribe((res:any)=>{
      if(res.code === -401){
        this.router.navigate(['login']);
        return;
      }else if(res.code>=0){
        callblack(res);
      }else{
        this.totastService.waring(res.msg);
      }
    });
  }
}
