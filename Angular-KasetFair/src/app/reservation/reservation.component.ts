import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { Convert as BootCvt, Boot, BootReservation } from '../model/boot.model';
import { Convert as zoneCvt, Zone } from '../model/zone.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import * as qrcode from 'qrcode';
import promptpay from 'promptpay-qr';
import { Convert as ReservationCvt, Reservation } from '../model/list-reservation.model';
import { Convert as GetEventCvt, GetEvent } from '../model/get-event.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  GetEvents: GetEvent[] = [];
  imgBase64: string | null = null;
  firstname: string = '';
  totalReservationPrice: number = 0;
  lastname: string = '';
  selectedFile: File | null = null;
  email: string = '';
  id: number = 0;
  tel: string = '';
  boots: Boot[] = [];
  reservations: Reservation[] = [];
  bootReservation: BootReservation = { totalPrice: 0, boots: [] };
  desiredIdZone: number = 0;
  zones: Zone[] = [];
  qrCodeImageUrl: string = ''; // Added property to hold QR code image URL
  imageUploaded: boolean = false; // Track whether an image is uploaded

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
  ) {
    this.http
      .get(this.dataService.apiEndpoint + '/zone')
      .subscribe((data: any) => {
        this.zones = zoneCvt.toZone(JSON.stringify(data));
        console.log(this.zones);
      });
  }

  ngOnInit(): void {
    this.bootReservation.totalPrice = 0;
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
      this.http
        .get(this.dataService.apiEndpoint + '/reservation?id=' + this.id)
        .subscribe((data: any) => {
          this.reservations = data.map((item: any) => ReservationCvt.toReservation(JSON.stringify(item)));
          console.log(this.reservations);
          const totalBootCount = this.reservations.reduce((total, res) => total + res.boot_count, 0);
          const id_boots = params['id_boot'] ? params['id_boot'].split(',') : [];
          if (totalBootCount + id_boots.length > 4) {
            Swal.fire({
              title: 'Error!',
              text: 'Total number of boots cannot exceed 4',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else if (id_boots.length > 0) {
            this.loadBootData(id_boots);
          }
        });
    });
    this.generateQRCode();
    this.http
    .get(this.dataService.apiEndpoint + '/get-event')
    .subscribe((data: any) => {
      this.GetEvents = GetEventCvt.toGetEvent(JSON.stringify(data));
      console.log(this.GetEvents);
    });
  }

  loadBootData(id_boots: string[]): void {
    id_boots.forEach((id_boot) => {
      this.http
        .get(this.dataService.apiEndpoint + '/boot-reservation-new/' + id_boot)
        .subscribe((data: any) => {
          if (data && data.boots && Array.isArray(data.boots)) {
            const bootData: Boot[] = data.boots;
            this.boots = [...this.boots, ...bootData];
            console.log(this.boots);

            this.generateQRCode();
          } else {
            console.error('Invalid response format:', data);
          }
        });
    });
  }

  calculateTotalPrice(): number {
    return this.boots.reduce((total, boot) => total + boot.price, 0);
  }

  async generatePromptPayQRCode(amount: number): Promise<string> {
    const promptPayPhoneNumber = '0981610887'; 
    const payload = promptpay(promptPayPhoneNumber, { amount });
    try {
      return await qrcode.toDataURL(payload);
    } catch (error) {
      console.error('Error generating QR code', error);
      return '';
    }
  }

  async generateQRCode(): Promise<void> {
    try {
      const totalPrice = this.calculateTotalPrice(); 
      const qrCodeDataUrl = await this.generatePromptPayQRCode(totalPrice); 
      this.qrCodeImageUrl = qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      this.qrCodeImageUrl = ''; 
    }
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
      this.imageUploaded = true; // Set image uploaded to true
    }
  }

  isReservationAllowed(): boolean {
    const today = new Date();
    return this.GetEvents.every(event => new Date(event.date_end_payment) > today) || this.imageUploaded;
  }

  reservation(sell: string) {
    if (!this.id) {
      return; // Handle error if user ID is missing
    }
    if (!sell) {
      Swal.fire({
        title: 'เพิ่มข้อมูลขาย!',
        text: 'กรุณาระบุของที่จะขาย',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
      });
      return; // Handle error if sell is missing
    }
    const formData = new FormData();
    formData.append('sell', sell);
    formData.append('id', this.id.toString());
    formData.append('img_slip', this.selectedFile!);

    const endpoint = `${this.dataService.apiEndpoint}/add-reservation`;

    this.http.post(endpoint, formData).subscribe(
      (response: any) => {
        console.log('Reservation successful:', response);
        const lastInsertedId = response.last_idx;

        const updateData = this.boots.map((boot: Boot) => {
          return { id_boot: boot.id_boot, id_reservation: lastInsertedId };
        });

        const updateEndpoint = `${this.dataService.apiEndpoint}/update-boot`;
        this.http.post(updateEndpoint, updateData).subscribe(
          (updateResponse: any) => {
            console.log('Boots updated successfully:', updateResponse);
            Swal.fire({
              title: 'บันทึกข้อมูลสำเร็จ!',
              text: 'คุณได้ทำการจองสำเร็จ',
              icon: 'success',
              confirmButtonText: 'ตกลง',
            });
            this.router.navigate(['/list-reservation']);
          },
          (updateError) => {
            Swal.fire({
              title: 'เกิดข้อผิดพลาด!',
              text: 'ไม่สามารถอัปเดตข้อมูลบูตได้',
              icon: 'error',
              confirmButtonText: 'ตกลง',
            });
            console.error('เกิดข้อผิดพลาดในการอัปเดตบูต:', updateError);
          }
        );
      },
      (error) => {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถทำการจองได้',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
        console.error('เกิดข้อผิดพลาดในการจอง:', error);
      }
    );
  }
}
