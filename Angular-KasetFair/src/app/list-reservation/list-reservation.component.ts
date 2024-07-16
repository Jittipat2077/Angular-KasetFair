import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { Convert as ReservationCvt, Reservation } from '../model/list-reservation.model';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import promptpay from 'promptpay-qr'; // Correct default import
import * as qrcode from 'qrcode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-reservation',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit {
  imgBase64: string | null = null;
  firstname: string = '';
  lastname: string = '';
  email: string = "";
  id: number = 0;
  tel: string = "";
  reservations: Reservation[] = [];
  qrCodeData: { [key: number]: string } = {}; // Store QR codes by reservation id

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.email = user.email;
        this.tel = user.tel;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.id = user.id;
      }
    });
    this.http
      .get(this.dataService.apiEndpoint + '/reservation?id=' + this.id)
      .subscribe((data: any) => {
        this.reservations = data.map((item: any) => ReservationCvt.toReservation(JSON.stringify(item)));
        console.log(this.reservations);
        this.generateAllQRCodes();
      });
  }

  async generateAllQRCodes(): Promise<void> {
    for (const reservation of this.reservations) {
      if (reservation.total_price) {
        const qrCodeData = await this.generatePromptPayQRCode(reservation.total_price);
        this.qrCodeData[reservation.id] = qrCodeData;
      }
    }
  }

  async generatePromptPayQRCode(totalPrice: number): Promise<string> {
    const promptPayPhoneNumber = '0981610887'; // Replace with actual PromptPay phone number
    const payload = promptpay(promptPayPhoneNumber, { amount: totalPrice });
    try {
      return await qrcode.toDataURL(payload);
    } catch (error) {
      console.error('Error generating QR code', error);
      return '';
    }
  }

  Delete(id_reservation: number): void {
    Swal.fire({
      title: 'ยกเลิกการจอง',
      text: "ต้องการยกเลิกการยกเลิกการจองใช่หรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'ไม่',
      confirmButtonText: 'ใช่ต้องการยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `${this.dataService.apiEndpoint}/delete-reservation/${id_reservation}`;
        this.http.delete(apiUrl).subscribe(
          (response: any) => {
            console.log('Delete response:', response);
            Swal.fire(
              'การยกเลิก!',
              'การยกเลิกการจองเสร็จสิ้น.',
              'success'
            ).then(() => {
              // Refresh the page or reload the component
              window.location.reload(); // Refreshes the entire page
            });
          },
          (error) => {
            console.error('Delete error:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the reservation.',
              'error'
            );
          }
        );
      }
    });
  }

  Pay(id_reservation: number) {
    this.router.navigate(['/payment-user'], {
      queryParams: {
        id_reservation: id_reservation,
        // firstname: this.firstname,
        // lastname: this.lastname
      },
      // replaceUrl: true // This will replace the current URL in the browser history
    });
  }
}
