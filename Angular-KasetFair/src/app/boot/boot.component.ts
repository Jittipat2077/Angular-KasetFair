import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../service/data.service.service';
import { Convert as BootCvt, Boot } from '../model/boot.model';
import { Convert as zoneCvt, Zone } from '../model/zone.model';
import { CommonModule } from '@angular/common';
import { Convert as ReservationCvt, Reservation } from '../model/list-reservation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boot',
  standalone: true,
  imports: [CommonModule],
  providers: [DataServiceService],
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss'],
})
export class BootComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  id: number = 0;
  tel: string = '';
  boots: Boot[] = [];
  desiredIdZone: number = 0;
  zones: Zone[] = [];
  selectedBootIds: number[] = [];
  maxSelection: number = 4;
  reservations: Reservation[] = [];
  totalReservedBoots: number = 0;

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
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.id = user.id;
      }
      this.desiredIdZone = parseInt(params['id_zone']) || 0;
      if (this.desiredIdZone !== 0) {
        this.loadBootData();
        this.loadZoneData();
      }
    });
    this.loadReservationData();
  }

  loadBootData(): void {
    this.http
      .get(this.dataService.apiEndpoint + '/boot/' + this.desiredIdZone)
      .subscribe((data: any) => {
        this.boots = BootCvt.toBoot(JSON.stringify(data));
        console.log(this.boots);
      });
  }

  loadZoneData(): void {
    this.http
      .get(this.dataService.apiEndpoint + '/zone/' + this.desiredIdZone)
      .subscribe((data: any) => {
        this.zones = zoneCvt.toZone(JSON.stringify(data));
        console.log(this.zones);
      });
  }

  loadReservationData(): void {
    this.http
      .get(this.dataService.apiEndpoint + '/reservation?id=' + this.id)
      .subscribe((data: any) => {
        this.reservations = data.map((item: any) => ReservationCvt.toReservation(JSON.stringify(item)));
        this.totalReservedBoots = this.reservations.reduce((sum, reservation) => sum + reservation.boot_count, 0);
        console.log(this.reservations);
      });
  }

  reserveSelectedBoots(): void {
    const totalSelectedAndReservedBoots = this.selectedBootIds.length + this.totalReservedBoots;
    console.log('Selected Boot IDs:', this.selectedBootIds);
  
    // Check if the total number of selected and reserved boots exceeds the limit
    if (totalSelectedAndReservedBoots > this.maxSelection) {
      Swal.fire({
        title: 'เกินจํานวนที่กําหนด',
        text: 'สามารถจองได้ไม่เกิน 4 บูธ',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;  // Exit the function if the limit is exceeded
    } 
    
    // Check if no boots are selected
    if (this.selectedBootIds.length === 0) {
      Swal.fire({
        title: 'ยังไม่ได้เลือกบูธ',
        text: 'กรุณาเลือกบูธที่ต้องการจอง',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;  // Exit the function if no boots are selected
    }
  
    // All checks passed, navigate to the reservation page
    this.router.navigate(['/reservation'], {
      queryParams: {
        id_boot: this.selectedBootIds.join(',')
      }
    });
  }
  
  checkIfDisabled(event: Event, id_boot: number): void {
    const checkbox = event.target as HTMLInputElement;
    if ( checkbox.disabled) {
      event.preventDefault();
      Swal.fire({
        title: 'Limit Exceeded!',
        text: 'You can reserve up to 4 boots only',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
  
  toggleBootSelection(id_boot: number): void {
    const index = this.selectedBootIds.indexOf(id_boot);
    if (index === -1) {
      // Check if adding this boot would exceed the maximum allowed selection
      if (this.selectedBootIds.length + this.totalReservedBoots < this.maxSelection) {
        this.selectedBootIds.push(id_boot);
      } else {
        Swal.fire({
          title: 'เกินจํานวนที่กําหนด',
          text: 'สามารถจองได้ไม่เกิน 4 บูธ',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else {
      this.selectedBootIds.splice(index, 1);
    }
  }
  isReservationFull(): boolean {
    return ( this.totalReservedBoots) >= this.maxSelection;
  }
  
}
