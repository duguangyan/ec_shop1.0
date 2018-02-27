import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TotastService} from '../../service/totast.service';
declare  var layer:any;
@Component({
  selector: 'app-pay-doing',
  templateUrl: './pay-doing.component.html',
  styleUrls: ['./pay-doing.component.css']
})
export class PayDoingComponent implements OnInit {
  public queryParams: any;
  public iconShow: boolean = true;
  private layerIndex: any;

  // true为微信  false 为支付宝
  constructor(public activatedRoute: ActivatedRoute,
              public router: Router,
              public totastService: TotastService) {
    this.layerIndex = layer.load(2, {shade: false});
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      layer.close(this.layerIndex);
    });
  }

  ngOnInit() {
  }

  //返回上一页
  goback() {
    window.history.go(-1);
  }

  //微信还是支付宝
  doIconShow(){
    this.iconShow = !this.iconShow;
  }

  // 去支付
  goPayDoing(){
    //this.totastService.success('支付成功');
    this.router.navigate(['paysuccess'],{ queryParams : this.queryParams});

  }
}
