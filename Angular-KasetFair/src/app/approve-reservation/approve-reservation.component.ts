import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { CommonModule } from '@angular/common';
import { Convert as approveReservationCvt, ApproveReservation } from '../model/approve-reservation.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-approve-reservation',
  standalone: true,
  imports: [CommonModule],
  providers: [DataServiceService],
  templateUrl: './approve-reservation.component.html',
  styleUrl: './approve-reservation.component.scss'
})
export class ApproveReservationComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  approveReservations: ApproveReservation[] = [];
  Id_Reservation: number = 0; // Set to an initial value that is not feasible
  selectedBootIds: number[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        // this.email = user.email ;
        // this.email = user.email ;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        // this.id = user.id;
      }
      this.Id_Reservation = parseInt(params['id_reservation']) || 0; // If id_zone is not present, default to 0
      if (this.Id_Reservation !== 0) {
        this.loadapprove();
      }
    });
  }

  loadapprove(): void {
    this.http
      .get(this.dataService.apiEndpoint + '/reservation-approve/' + this.Id_Reservation)
      .subscribe((data: any) => {
        this.approveReservations = approveReservationCvt.toApproveReservation(JSON.stringify(data));
        console.log(this.approveReservations);
      });
  }
  approveReservation(): void {
    this.http
      .get(this.dataService.apiEndpoint + '/apply-reservation-approve/' + this.Id_Reservation)
      .subscribe((data: any) => {
        console.log('Reservation approved', data);
        Swal.fire({
          title: 'อนุมัติสําเร็จ!',
          text: 'คุณได้อนุมัติสําเร็จ!',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });

        this.loadapprove(); // Reload the data to get the updated status
      }, (error: any) => {
        console.error('Error approving reservation', error);
      });
      
  }
  
}
