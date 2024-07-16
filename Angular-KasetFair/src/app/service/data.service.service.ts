import { Injectable } from '@angular/core';
import { Convert as BootCvt, Boot } from '../model/boot.model';
import { Convert as zoneCvt, Zone } from '../model/zone.model';
import { Subject, Observable } from 'rxjs'; // นำเข้า Subject และ Observable จาก rxjs

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  firstname: string = '';
  lastname: string = '';
  id: number = 0;
  boots: Boot[] = [];
  desiredIdZone: number = 0;
  zones: Zone[] = [];
  checkedCount: number = 0;
  selectedBootIds: number[] = [];

  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded(): Observable<void> {
    return this.refreshNeeded$.asObservable();
  }

  notifyRefreshNeeded(): void {
    this.refreshNeeded$.next();
  }
  // apiEndpoint = 'http://localhost/api-new';

  apiEndpoint = 'https://jittipat.bowlab.net/api-new';
  // isLoggedIn(): boolean {
  //   // ตรวจสอบว่ามีข้อมูลผู้ใช้งานที่เก็บอยู่ใน Local Storage หรือไม่
  //   // หากมีแสดงว่าผู้ใช้งานได้เข้าสู่ระบบแล้ว
  //   return !!localStorage.getItem('user');
  // }

  // getUser(): any {
  //   // ดึงข้อมูลผู้ใช้งานจาก Local Storage
  //   const userData = localStorage.getItem('user');
  //   // แปลงข้อมูลผู้ใช้งานจาก JSON เป็น Object
  //   return userData ? JSON.parse(userData) : null;
  // }
}
