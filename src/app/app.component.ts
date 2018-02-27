import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public username: string;
  constructor(
    public router: Router
  ) { }
  ngOnInit() {
    this.router.navigate(['home']);
  }
  public onDeactivate() {
    window.scrollTo(0, 0);
  }
}
