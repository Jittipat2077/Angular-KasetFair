import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { CommonModule } from '@angular/common';
import { Convert as listReservationApproveCvt, ListReservationApprove } from '../model/list-reservation-approve.model';
@Component({
  selector: 'app-list-reservation-approve',
  standalone: true,
  imports: [CommonModule],
  providers: [DataServiceService],
  templateUrl: './list-reservation-approve.component.html',
  styleUrl: './list-reservation-approve.component.scss'
})
export class ListReservationApproveComponent implements OnInit  {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  tel: string = '';
  role: string = '';
  listReservationApproves: ListReservationApprove[] = [];
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
      .get(this.dataService.apiEndpoint + '/list-reservation-approve')
      .subscribe((data: any) => {
        this. listReservationApproves = listReservationApproveCvt.toListReservationApprove(JSON.stringify(data));
        console.log(this. listReservationApproves);
      });
      
  }

}
