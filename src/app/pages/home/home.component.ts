import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {TotastService} from '../../service/totast.service';
declare var Swiper:any;
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLogin: boolean = false;
  private mySwiper: any;
  constructor(
    public activatedRoute: ActivatedRoute,   //这里需要注入ActivatedRoute模块
    public router: Router,
    public httpService: HttpService,
    public totastService: TotastService
  ) {
    /*activatedRoute.queryParams.subscribe(queryParams => {
      let productId = queryParams.productId;
      let title = queryParams.title;
      console.log(title);
    });*/
  }

  ngOnInit() {
    //console.log(1);

    //首页轮播图
    this.swiper();
    //交易动态轮播
    this.dynamic();
  }

  search() {
    if(!Cookie.load('username')){
      this.isLogin = true;
    }else{
      this.router.navigate(['search']);
    }
  }

  toLogin(){
    this.isLogin = false;
    this.router.navigate(['login']);
  }

  // 交易动态轮播
  dynamic(){
    /*$(".index-dynamic-p").animate({left:"-1000px"},10000);*/
    setInterval(()=>{
      console.log($(".index-dynamic-p").css("left"));
      if($(".index-dynamic-p").css("left") ==='240px'){
        $(".index-dynamic-p").animate({left:"-1500px"},40000);
      }else if($(".index-dynamic-p").css("left") ==="-1500px"){
        $(".index-dynamic-p").css('left','240px');
      }
    },1000)

  }

  //轮播图
  swiper(){
    //首页轮播
   this.mySwiper = new Swiper('.swiper-container', {
      autoplay:true,
      pagination: {
        el: '.swiper-pagination',
      },
    });

  }
}
