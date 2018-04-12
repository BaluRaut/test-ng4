import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { Constants } from '../constants';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(private httpService: HttpService, private router: Router) {
    this.loadUser();
    this.httpService = httpService;
  }
    userList = [];
    displayedColumns = ['name', 'email', 'address'];
    loadUser() {
      this.httpService.get(Constants.USER_LIST_URL).subscribe(data => this.userList = data);
    }
    showAlbums(row) {
      this.router.navigate(['/dashboard', row.id]);
    }
}

