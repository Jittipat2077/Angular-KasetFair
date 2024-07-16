import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BootComponent } from './boot/boot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { Component } from '@angular/core';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { CheckReservationComponent } from './check-reservation/check-reservation.component';
import { ApproveReservationComponent } from './approve-reservation/approve-reservation.component';
import { ListReservationApproveComponent } from './list-reservation-approve/list-reservation-approve.component';
import { AddZoneComponent } from './add-zone/add-zone.component';
import { BootandzoneComponent } from './bootandzone/bootandzone.component';
import { AddBootComponent } from './add-boot/add-boot.component';
import { EditBootComponent } from './edit-boot/edit-boot.component';
import { EditZoneComponent } from './edit-zone/edit-zone.component';
import { DetailBootComponent } from './detail-boot/detail-boot.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ListReservationNotpayComponent } from './list-reservation-notpay/list-reservation-notpay.component';
import { ListAllUserComponent } from './list-all-user/list-all-user.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentUserComponent } from './payment-user/payment-user.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
export const routes: Routes = [
    {'path':'',component:IndexComponent},
    {'path':'index',component:IndexComponent},
    {'path':'login',component:LoginComponent},
    {'path':'register',component:RegisterComponent},
    {'path':'boot',component:BootComponent},
    {'path':'dashboard',component:DashboardComponent},
    {'path':'reservation',component:ReservationComponent},
    {'path':'list-reservation',component:ListReservationComponent},
    {'path':'check-reservation',component:CheckReservationComponent},
    {'path':'approve-reservation',component:ApproveReservationComponent},
    {'path':'list-reservation-approve',component:ListReservationApproveComponent},
    {'path':'list-reservation-notpay',component:ListReservationNotpayComponent},
    {'path':'bootandzone',component:BootandzoneComponent},
    {'path':'add-zone',component:AddZoneComponent},
    {'path':'add-boot',component:AddBootComponent},
    {'path':'add-event',component:AddEventComponent},
    {'path':'edit-boot',component:EditBootComponent},
    {'path':'edit-zone',component:EditZoneComponent},
    {'path':'detail-boot',component:DetailBootComponent},
    {'path':'list-all-user',component: ListAllUserComponent },
    {'path':'edit-event',component: EditEventComponent },
    {'path':'edit-profile',component: EditProfileComponent },
    {'path':'edit-password',component: EditPasswordComponent },
    {'path':'payment-user',component: PaymentUserComponent },
  
];   
