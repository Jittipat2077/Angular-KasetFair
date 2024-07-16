import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { CommonModule } from '@angular/common';
import { Convert as checkReservationCvt, CheckReservation } from '../model/check-reservation.model';

@Component({
  selector: 'app-check-reservation',
  standalone: true,
  imports: [CommonModule],
  providers: [DataServiceService],
  templateUrl: './check-reservation.component.html',
  styleUrls: ['./check-reservation.component.scss']
})
export class CheckReservationComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  tel: string = '';
  role: string = '';
  checkReservations: CheckReservation[] = [];
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
      .get(this.dataService.apiEndpoint + '/reservation-wait')
      .subscribe((data: any) => {
        this.checkReservations = checkReservationCvt.toCheckReservation(JSON.stringify(data));
        console.log(this.checkReservations);
      });
      
  }

  checkReservationDetail(id_reservation: number) {
    this.router.navigate(['/approve-reservation'], {
      queryParams: {
        id_reservation:id_reservation,
        // firstname: this.firstname,
        // lastname: this.lastname
      },
      // replaceUrl: true // This will replace the current URL in the browser history
    });
  }
}
