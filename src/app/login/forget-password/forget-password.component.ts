import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TotastService} from '../../service/totast.service';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public isSends: boolean = true;
  public sends: any;
  public phone: string;
  public code: string;
  public passWordVal: null;
  public codeId: any;
  public setIntervalTimer: any;
  public isShowPassword:boolean = true;
  constructor(public totastService: TotastService,
              public httpService: HttpService,
              public cd: ChangeDetectorRef,
              public router: Router) {
    this.sends =60;
  }

  ngOnInit() {
  }
  // 返回上一页
  goback(){
    window.history.go(-1);
  }

  //获取验证码
  getMsgCode(){
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    if(this.code === ''&& this.passWordVal === null ){
      this.totastService.waring('验证码错误');
      return false;
    }
    if (!(/^[A-Za-z0-9]{6,18}$/.test(this.passWordVal)) && this.passWordVal==='' && this.passWordVal === null ) {
      this.totastService.waring('请输入6-18位由字母或数字组成的密码');
      return false;
    }
    const codeParams = {
      phone:this.phone,
      token:''
    }
    /*this.httpService.get('/auth/member/exist?user_name='+this.phone,codeParams).subscribe(( res: any)=>{
      if(res.code>=0){
        this.httpService.get('/auth/member/psw/findsms?phone='+ this.phone,codeParams).subscribe(( ress: any)=>{
          if(ress.code >=0){
            this.totastService.success('短信发送成功');
            this.codeId = ress.data;
            this.isSends = !this.isSends;
            if(this.sends > 0){
              this.setIntervalTimer = setInterval(()=>{
                this.sends--;
                if(this.sends<1){
                  clearInterval(this.setIntervalTimer);
                  this.isSends = !this.isSends;
                }
              },1000);
            }
          }
        })
      }else{
        this.totastService.error('你的手机暂未注册');
        return false
      }
    },(error)=>{
      this.totastService.error('网络慢，请稍后再试');
      return false
    })*/
    this.httpService.get('/auth/member/exist?user_name='+this.phone,codeParams,(res:any)=>{
      this.httpService.get('/auth/member/psw/findsms?phone='+ this.phone,codeParams,(ress:any)=>{
        this.totastService.success('短信发送成功');
        this.codeId = ress.data;
        this.isSends = !this.isSends;
        if(this.sends > 0){
          this.setIntervalTimer = setInterval(()=>{
            this.sends--;
            if(this.sends<1){
              clearInterval(this.setIntervalTimer);
              this.isSends = !this.isSends;
            }
          },1000);
        }
      })
    })
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  // 显示隐藏密码
  passWordShow() {
    this.isShowPassword = !this.isShowPassword;
  }

  // 提交
  submit() {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    if(this.code === '' || this.code === undefined ){
      this.totastService.waring('验证码错误');
      return false;
    }
    if (!(/^[A-Za-z0-9]{6,18}$/.test(this.passWordVal)) || this.passWordVal==='' || this.passWordVal === undefined ) {
      this.totastService.waring('请输入6-18位由字母或数字组成的密码');
      return false;
    }

    const params = {
      user_name:this.phone,
      user_psw:this.passWordVal,
      sms_id:this.codeId,
      code:this.code
    }
    /*this.httpService.post('/auth/member/psw/update',params).subscribe((res:any)=>{
      if(res.code>=0){
        this.totastService.success('重新设置成功');
        this.router.navigate(['login']);
      }else{
        this.totastService.error('网络慢，请稍后再试');
      }
    })*/
    this.httpService.post('/auth/member/psw/update',params,(res:any)=>{
      this.totastService.success('重新设置成功');
      this.router.navigate(['login']);
    })
  }
}
