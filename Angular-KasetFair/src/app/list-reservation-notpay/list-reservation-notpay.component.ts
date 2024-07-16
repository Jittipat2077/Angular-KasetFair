import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { CommonModule } from '@angular/common';
import { Convert as listReservationNotpayCvt, ListReservationNotpay } from '../model/list-reservation-notpay.model';
@Component({
  selector: 'app-list-reservation-notpay',
  standalone: true,
  imports: [CommonModule],
  providers: [DataServiceService],
  templateUrl: './list-reservation-notpay.component.html',
  styleUrl: './list-reservation-notpay.component.scss'
})
export class ListReservationNotpayComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  tel: string = '';
  role: string = '';
  listReservationNotpays: ListReservationNotpay[] = [];
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
      .get(this.dataService.apiEndpoint + '/list-reservation-NotPay')
      .subscribe((data: any) => {
        this. listReservationNotpays = listReservationNotpayCvt.toListReservationNotpay(JSON.stringify(data));
        console.log(this. listReservationNotpays);
      });
      
  }
}
