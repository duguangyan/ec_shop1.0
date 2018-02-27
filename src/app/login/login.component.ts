
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
import {HttpService} from '../service/http.service';
import {TotastService} from '../service/totast.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public isPwShow: boolean;
  public phone: string;
  public passWord: any;
  constructor(public router:Router,
              public httpService: HttpService,
              public totastService: TotastService,
              public http: HttpClient) {
    this.isPwShow = true;
  }

  ngOnInit() {

  }

  login() {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){
      this.totastService.waring('请输入有效电话号码');
      return false;
    }
    if(this.passWord === undefined){
      this.totastService.waring('请输入有效密码');
    }
    const params = {
      user_name: this.phone,
      user_psw: this.passWord
    }
    /*this.httpService.post('/auth/member/login',params).subscribe((res: any)=>{
      if(res.code>=0) {
        console.log(res);
        this.getUserMsg(res.data);
      }else{
        this.totastService.error('用户名或密码错误');
      }
    })*/
    this.httpService.post('/auth/member/login',params,(res:any)=>{
      this.getUserMsg(res.data);
    })
  }

  //显示隐藏密码
  showPassWord() {
    this.isPwShow = !this.isPwShow;
  }
  // 获取用户信息
  getUserMsg(token) {
    const params = {
      token:'',
      member_token:token
    }
   /*this.httpService.get('/auth/member/info?member_token='+id,params).subscribe((res:any)=>{
      if(res.code>=0){
        Cookie.save('userId',res.data.id,7);
        Cookie.save('username',res.data.user_name,7);
        this.totastService.success('请求成功');
        this.router.navigate(['settings']);
      }else{
        this.totastService.error('请求失败');
      }
    })*/
    this.httpService.get('/auth/member/info?member_token='+token,params,(res:any)=>{
      Cookie.save('token',token,7);
      Cookie.save('username',res.data.user_name,7);
      this.router.navigate(['settings']);
    });
  }

  // 忘记密码
  goForgetPassWord() {
    this.router.navigate(['forgetPassword']);
  }

  // 去注册
  goRegister(){
    this.router.navigate(['register']);
  }

  //返回上一页
  goback() {
    window.history.go(-1);
  }
}
