import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userRole: string;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      let localStorageObject = JSON.parse(localStorage.getItem('user'));
      if (localStorageObject != null) {
        this.userRole = localStorageObject.role;
      }
    }
  }
}