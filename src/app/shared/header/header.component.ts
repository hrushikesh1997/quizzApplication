import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  constructor(public auth:AuthService) { 
  }

  ngOnInit() {
  }
  
  login(){
    this.auth.googleSignIn();
  }
}
