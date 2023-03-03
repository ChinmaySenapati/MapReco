import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      let localStorageObject = JSON.parse(localStorage.getItem('user'));
      if (localStorageObject != null) {
        this.userName = localStorageObject.name;
      }
    }
  }

}
