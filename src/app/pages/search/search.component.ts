import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {TotastService} from '../../service/totast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public seVal1: any;
  public selectVals1:any;
  public seVal2: any;
  public selectVals2: any;
  public seVal3: any;
  public selectVals3: any;
  public chooseBtnVal: string[];
  public isBtnShow: any;
  public imageUrl1: any = '../../../assets/imgs/kbg.png';
  public imageUrl2: any = '../../../assets/imgs/kbg.png';
  public imageUrl3: any = '../../../assets/imgs/kbg.png';
  public img1: any;
  public imgId1: any;
  public isImgUpload: boolean;
  public loading1: boolean;
  public loading2: boolean;
  public loading3: boolean;
  public img2: any;
  public imgId2: any;
  public userId: string;
  public img3: any;
  public imgId3: any;
  public minPrice: any;
  public maxPrice: any;
  public fieldDesc: any;
  public selectNumber: any;
  public params: any;
  public selectNumberOne: number;
  public samplingLinkman: string;
  public samplingNumber: string;
  public samplingAddress: any = '';
  public isLogin: boolean = false;
  public price: any;
  public materialName: any;
  public token: string;
  constructor(public httpService: HttpService,
              public sanitizer: DomSanitizer,
              public cd: ChangeDetectorRef,
              public router: Router,
              public totastService: TotastService,) {
    if(!Cookie.load('username')){
      this.isLogin = true;
    }else{
      this.token = Cookie.load('token');
    }
  }

  ngOnInit() {
    this.isImgUpload = false;
    this.imageUrl1 = '../../assets/imgs/kbg.png';
    this.imageUrl2 = '../../assets/imgs/kbg.png';
    this.imageUrl3 = '../../assets/imgs/kbg.png';
    this.selectVals1 = ['现货','定制'];
    this.seVal1 = this.selectVals1[0];
    this.chooseBtnVal= ['图片找料','上门取样','寄送样品'];
    this.isBtnShow = 0;
    //this.getSelectVals2(0); // 获取select2数据
  }
  //第一个下拉框
  // 第一个 select
  select1Change() {
    if(this.seVal1 ==='现货'){
      this.selectNumberOne =1;
    }else{
      this.selectNumberOne =2;
    }
    console.log(this.seVal1);
  }
  // 切换找料方式
  activeBtn(i){
    this.isBtnShow = i;
  }

  //获取图片
  // 获取图片
  onChangeSelectFile(event,index){
    // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
    if(index===1){
      const file1 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file1.type)){
        this.totastService.waring("请确保文件为图像类型");
        return false;
      }
      const reader1 = new FileReader();
      reader1.readAsDataURL(file1);
      reader1.onload = (e:any)=>{
        //就是base64
        this.img1 = e.target.result;
        this.httpService.post('/find/image/upload',{member_token:this.token,image:this.img1},(res:any)=>{
          this.imageUrl1 = res.data.image_url;
          this.imgId1 = res.data.image_id;
          this.isImgUpload = true;
          this.loading1 = false;
        })
      }
      this.imageUrl1 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file1));
    }else if(index===2){
      this.loading2 = true;
      const file2 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file2.type)){
        this.totastService.waring("请确保文件为图像类型");
        return false;
      }
      const reader2 = new FileReader();
      reader2.readAsDataURL(file2);

      reader2.onload = (e:any)=>{
        // 就是base64
        this.img2 = e.target.result;

        this.httpService.post('/find/image/upload',{member_token:this.token,image:this.img2},(res:any)=>{
          this.imageUrl2 = res.data.image_url;
          this.imgId2 = res.data.image_id;
          this.isImgUpload = true;
          this.loading2 = false;
        })

      }
      this.imageUrl2 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file2));
    }else if(index===3){
      this.loading3 = true;
      const file3 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file3.type)){
        this.totastService.waring("请确保文件为图像类型");
        return false;
      }
      const reader3 = new FileReader();
      reader3.readAsDataURL(file3);

      reader3.onload = (e:any)=>{
        // 就是base64
        this.img3 = e.target.result;
        this.httpService.post('/find/image/upload',{member_token:this.token,image:this.img3},(res:any)=>{
          this.imageUrl3 = res.data.image_url;
          this.imgId3 = res.data.image_id;
          this.isImgUpload = true;
          this.loading3 = false;
        })

      }
      this.imageUrl3 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file3));
    }

    this.cd.markForCheck();
    this.cd.detectChanges();

  }

  // 获取selectVals2的数据
  /*getSelectVals2(id) {
    this.getSelectVal(id).subscribe((res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.selectVals2 = res.data;
        this.seVal2 = res.data[0].name;
        // 获取selectVals3的数据
        this.getSelectVal(this.selectVals2[0].id).subscribe(( ress:any)=>{
          if(ress.code>=0){
            this.selectVals3 = ress.data;
            this.seVal3 = ress.data[0].name;
            this.selectNumberTodo();
          }
        })
      }
      this.cd.markForCheck();
      this.cd.detectChanges();

    })

  }*/
  /*getSelectVal(id) {
    return this.httpService.get('/item/category/get?parent_cid='+id,{});
  }*/

  // 获取选项号码
  selectNumberTodo(){
    for(let i=0;this.selectVals3.length>i;i++){
      if(this.seVal3 === this.selectVals3[i].name){
        this.selectNumber = this.selectVals3[i].id;
        // alert(this.selectNumber);
      }
    }
  }

  // 第二个 select
  /*select2Change(seVal2) {
    for(let i=0;this.selectVals2.length>i;i++){
      if(seVal2 === this.selectVals2[i].name){
        const index = this.selectVals2[i].id;
        console.log(this.selectVals2);

        this.getSelectVal(index).subscribe((res:any)=>{
          if(res.code>=0){
            this.selectVals3 = res.data;
            this.seVal3 = res.data[0].name;
            this.selectNumberTodo();
          }else{
            this.totastService.error('网络慢，请稍后再试!');
          }
        })
      }
    }
    this.cd.markForCheck();
    this.cd.detectChanges();
  }*/
  // 第三个 select
  select3Change() {
    //console.log(seVal3);
    this.selectNumberTodo();
  }

  //去支付页面
  goPayment(selectIndex) {
        /*if(!(/^\d+(?:\.\d{1,4})?$/.test(this.minPrice))){
          this.totastService.waring('请输入正确的价格');
          return false;
        }else if(!(/^\d+(?:\.\d{1,4})?$/.test(this.maxPrice))){
          this.totastService.waring('请输入正确的价格');
          return false;
        }else if(parseFloat(this.maxPrice) < parseFloat(this.minPrice)){
          this.totastService.waring('价格范围输入不正确');
          return false;
        }else */
        if(this.fieldDesc === '' || this.fieldDesc === undefined){
          this.totastService.waring('请填写描述');
          return false;
        }
        this.params = {
          member_token:Cookie.load('token'),
          price_range:this.price,
          u_cname:this.materialName,
          field_desc:this.fieldDesc,
          sampling_type:selectIndex
          /*cid:this.selectNumber,
          sampling_type:selectIndex,
          min_price:this.minPrice,
          max_price:this.maxPrice,
          field_desc:this.fieldDesc,
          source_type:this.selectNumberOne,
          cname:this.seVal2 +' '+this.seVal3*/
        }
        if(selectIndex ===1){
          if(!this.isImgUpload){
            this.totastService.waring('请上传图片');
            return false;
          }
          this.params.img1 = this.imgId1;
          this.params.img2 = this.imgId2;
          this.params.img3 = this.imgId3;

          this.httpService.post('/find/demand/add',this.params,(res:any)=>{
            this.router.navigate(['payment'],{ queryParams : res.data });
          })
        }else if(selectIndex ===2){
          if(this.samplingLinkman === ''){
            this.totastService.waring('请填写联系人');
            return false;
          }else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.samplingNumber))){
            this.totastService.waring('请填写联系电话');
            return false;
          }else if(this.samplingAddress === '' || this.samplingAddress === null ){
            this.totastService.waring('请填写取样地址');
            return false;
          }
          this.params.sampling_linkman = this.samplingLinkman;
          this.params.sampling_number = this.samplingNumber;
          this.params.sampling_address = this.samplingAddress;

          this.httpService.post('/find/demand/add',this.params,(res:any)=>{
            this.router.navigate(['payment'],{ queryParams : res.data });
          })
        }else if(selectIndex ===3){

          this.httpService.post('/find/demand/add',this.params,(res:any)=>{
            this.router.navigate(['payment'],{ queryParams : res.data });
          })
        }
  }

  //是否登录
  toLogin(){
    this.isLogin = false;
    this.router.navigate(['login']);
  }
}
