import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // 返回上一层
  goback() {
    window.history.go(-1);
  }
}
