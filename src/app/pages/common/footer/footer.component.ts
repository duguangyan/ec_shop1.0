import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() select;
  constructor(public router: Router) { }

  ngOnInit() {

  }
  ngAfterContentInit(){
    setTimeout(()=>{
      this.select = this.select - 1;
      $(".footer a").eq(this.select).addClass('main-active');
    },1)
  }
}
