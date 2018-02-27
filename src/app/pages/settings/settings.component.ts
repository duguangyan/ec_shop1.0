import { Component, OnInit } from '@angular/core';
import {Cookie} from 'angular2-cookies';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public HeaderImgUrl = '../../../assets/imgs/settings_header.png';
  public isLogin: boolean = false;
  public hasLists: boolean = true;
  public userId: any;
  public lists: any;
  public username: string;
  private token: string;
  constructor(public httpService: HttpService,public router: Router) {
    if(Cookie.load('username')){
      this.token = Cookie.load('token');
      this.username = Cookie.load('username');
      this.isLogin = true;
      this.getLists();
    };
  }

  ngOnInit() {

  }

  //获取列表信息
  getLists(){
    if( !this.token ){
      return false
    }
    this.isLogin = true;
    const params = {
      member_token: this.token,
      page:1,
      pageSize:5,
      direction:1
    }
    /*this.httpService.get('/find/demand/list', {params}).subscribe((res: any)=>{
      if(res.code>=0){
        console.log(res);
        this.lists = res.data.list;
        if(this.lists.length>0){
          this.hasLists = true;
        }
      }
    });*/

    this.httpService.get('/find/demand/list', {params},(res:any)=>{
      this.lists = res.data.list;
      if(this.lists.length>0){
        this.hasLists = true;
      }
    })

  }

  // 去详情页
  goDetail(id){
    this.router.navigate(['orderlistdetail'],{ queryParams : {id} });
  }

  //去订单列表
  goMoreOrderList() {
    this.router.navigate(['orderlist']);

  }

  //退出登录
  logout(){
    Cookie.remove('username');
    Cookie.remove('userId');
    setTimeout(()=>{
      this.router.navigate(['login']);
    },500)

  }

  // 登录
  login() {
    this.router.navigate(['login']);
  }

}
