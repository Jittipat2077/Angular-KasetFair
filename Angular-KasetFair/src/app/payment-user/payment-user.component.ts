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
  selector: 'app-payment-user',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: './payment-user.component.html',
  styleUrls: ['./payment-user.component.scss'] // Fixed typo: styleUrl -> styleUrls
})
export class PaymentUserComponent implements OnInit {
  imgBase64: string | null = null;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  id: number = 0;
  tel: string = '';
  IdReservation: number = 0;
  reservations: Reservation[] = [];
  qrCodeData: { [key: number]: string } = {}; 
  selectedFile: File | null = null;
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
      this.IdReservation = parseInt(params['id_reservation'], 10) || 0;
    });

    this.http
      .get(this.dataService.apiEndpoint + '/reservation-payment?id_reservation=' + this.IdReservation)
      .subscribe((data: any) => {
        this.reservations = data.map((item: any) => ReservationCvt.toReservation(JSON.stringify(item)));
        console.log(this.reservations);
        this.generateAllQRCodes();
      });
  }
  PayUser() {
    if (!this.selectedFile) {
      Swal.fire({
        title: 'เพิ่มสลีป!',
        text: 'กรุณาเพิ่มสลีปการโอนก่อน',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('id_reservation', this.IdReservation.toString());
    formData.append('img_slip', this.selectedFile);
  
    const endpoint = `${this.dataService.apiEndpoint}/update-reservation`;
  
    this.http.post(endpoint, formData).subscribe(
      (response: any) => {
        console.log('Zone added successfully:', response);
        Swal.fire({
          title: 'อัปเดตข้อมูลสําเร็จ!',
          text: 'คุณได้ทำการอัปเดตข้อมูลสําเร็จ!',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        }).then(() => {
          this.dataService.notifyRefreshNeeded();
          this.router.navigate(['/list-reservation']);
        });
  
        // Handle success
      },
      (error) => {
        console.error('Failed to add zone:', error);
        Swal.fire({
          title: 'เพิ่มข้อมูลไม่สําเร็จ!',
          text: 'คุณได้ทำการเพิ่มข้อมูลไม่สําเร็จ',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      }
    );
  }
  async generateAllQRCodes(): Promise<void> {
    for (const reservation of this.reservations) {
      if (reservation.total_price) {
        const qrCodeData = await this.generatePromptPayQRCode(reservation.total_price);
        this.qrCodeData[reservation.id_reservation] = qrCodeData;
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
  Payupdate(id_reservation: number) {
    this.router.navigate(['/payment-user'], {
      queryParams: {
        id_reservation:id_reservation,
        // firstname: this.firstname,
        // lastname: this.lastname
      },
      // replaceUrl: true // This will replace the current URL in the browser history
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgBase64 = reader.result as string;
      };
      this.selectedFile = file;
    }
  }

}
