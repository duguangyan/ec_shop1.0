import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';

@Component({
  selector: 'app-order-list-detail',
  templateUrl: './order-list-detail.component.html',
  styleUrls: ['./order-list-detail.component.css']
})
export class OrderListDetailComponent implements OnInit {
  public queryParams: any;
  public id: any;
  public data: any = {};
  public imgUrl: any = '../../../assets/imgs/kbg.png';
  constructor(public activatedRoute: ActivatedRoute,
              public httpService: HttpService,
              public router: Router,
              public totastService: TotastService) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams.id;
      const params = {
        member_token:Cookie.load('token'),
        id:this.id
      }
      /*this.httpService.get('/find/demand/info',{params}).subscribe((res:any)=>{
        console.log(res);
        if(res.code>=0) {
          this.data = res.data;
          if(this.data.sampling_type === 1){
            this.data.sampling_type_new = '在线图片';
          }else if(this.data.sampling_type === 2){
            this.data.sampling_type_new = '上门取样';
          }else if(this.data.sampling_type === 3){
            this.data.sampling_type_new = '寄送样品';
          }
        }else{
          this.totastService.waring('数据请求失败');
        }
      })*/

      this.httpService.get('/find/demand/info',{params},(res:any)=>{
        this.data = res.data;
        if(this.data.sampling_type === 1){
          this.data.sampling_type_new = '在线图片';
        }else if(this.data.sampling_type === 2){
          this.data.sampling_type_new = '上门取样';
        }else if(this.data.sampling_type === 3){
          this.data.sampling_type_new = '寄送样品';
        }
      })
    });
  }

  ngOnInit() {

  }
  //返回上一页
  goback(){
    window.history.go(-1);
  }

  goPayment() {
    if(this.data){
      this.queryParams = this.data;
      this.router.navigate(['paydo'],{ queryParams : this.queryParams});
    }else{
      this.totastService.waring('网络慢，请稍后再试！');
    }

  }
}
