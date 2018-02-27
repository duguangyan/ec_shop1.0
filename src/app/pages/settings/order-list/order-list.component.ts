import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {Router} from '@angular/router';

declare var layui:any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public navNumber: any;
  public lists: any;
  public navOrders: number[];
  public navs: string[];
  public total:any;
  constructor(public httpService: HttpService, public router: Router, public cd: ChangeDetectorRef) {
    this.navs = ['全部订单','待付款','找料中','已完成'];
    this.navOrders = [5,4,6,7];
    this.navNumber = 0;
    this.lists = [];
    this.getListDetail(1);

  }

  ngOnInit() {
    setTimeout(()=>{
      this.pagination();
    },500)
  }
  // 返回上一级
  goback() {
    window.history.go(-1);
  }

  // 切换头部navs
  checkNavs(i) {
    this.navNumber = i;
  }
// 获取列表信息
  getListDetail(page) {
    if(!Cookie.load('token')){
      return false;
    }
    const params = {
      member_token: Cookie.load('token'),
      direction:1,
      page,
      pageSize:10
    }
    /*this.httpService.get('/find/demand/list', {params} ).subscribe((res: any)=>{
      if(res.code>=0){
        console.log(res);
        this.lists = res.data.list;
        this.total = res.data.total;
      }
    });*/
    this.httpService.get('/find/demand/list', {params},(res:any)=>{
      this.lists = res.data.list;
      this.total = res.data.total;
    })
    window.scrollTo(0, 0);
  }

  // 去列表详情
  goListDetail(id) {
    this.router.navigate(['orderlistdetail'],{queryParams:{id}});
  }
  // 分页
  pagination(){
    const that = this;
    layui.use(['laypage', 'layer'], ()=>{
      const laypage = layui.laypage;
      const layer = layui.layer;
      //完整功能
      laypage.render({
        elem: 'appOrderListsPagination'
        ,count: that.total
        ,groups:3
        ,prev:"<"
        ,next:">"
        ,theme: '#1E9FFF'
        ,jump: (obj,first)=>{
          //首次不执行
          if(!first){
            //do something
            layer.msg(obj.curr,{time:300});
            that.getListDetail(obj.curr);
          }
        }
      });

    });
    this.cd.detectChanges();
    this.cd.markForCheck();

  }
}
