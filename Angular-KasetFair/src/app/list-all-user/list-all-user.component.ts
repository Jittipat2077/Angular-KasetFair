import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { CommonModule } from '@angular/common';
import { Convert as listAllUserCvt, ListAllUser } from '../model/list-all-user.model';
@Component({
  selector: 'app-list-all-user',
  standalone: true,
  imports: [CommonModule],
  providers: [DataServiceService],
  templateUrl: './list-all-user.component.html',
  styleUrl: './list-all-user.component.scss'
})
export class ListAllUserComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  tel: string = '';
  role: string = '';
  listAllUsers: ListAllUser[] = [];
  id: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
  ) { }
  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.email = user.email;
      this.tel = user.tel;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.id = user.id;
      this.role = user.role;
    }

    this.http
      .get(this.dataService.apiEndpoint + '/list-all-user')
      .subscribe((data: any) => {
        this. listAllUsers = listAllUserCvt.toListAllUser(JSON.stringify(data));
        console.log(this. listAllUsers);
      });
      
  }
}
