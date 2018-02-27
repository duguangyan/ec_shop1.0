import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.css']
})
export class PaySuccessComponent implements OnInit {
  public queryParams: any;

  constructor(public activatedRoute: ActivatedRoute,
              public router: Router) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
    });
  }

  ngOnInit() {
  }
  //返回上一页
  goback(){
    window.history.go(-1);
  }
  //去订单详情页
  goOrderListDetail() {
    this.router.navigate(['orderlistdetail'],{ queryParams : {id:this.queryParams.id}});
  }

}
