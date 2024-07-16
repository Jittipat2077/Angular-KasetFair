// To parse this data:
//
//   import { Convert } from "./file";
//
//   const checkReservation = Convert.toCheckReservation(json);

export interface CheckReservation {
    account: Account[];  // Ensure this property exists
    reservation: Reservation;
  }
  
  export interface Account {
    firstname: string;
    lastname: string;
    boot: Boot[];
  }
  
  export interface Boot {
    id_zone: string;
    number_boot: string;
    price: number;
    zone: Zone;
  }
  
  export interface Zone {
    name_zone: string;
  }
  
  export interface Reservation {
    id_reservation: number;
    sell: string;
  }
  

// Converts JSON strings to/from your types
export class Convert {
    public static toCheckReservation(json: string): CheckReservation[] {
        return JSON.parse(json);
    }

    public static checkReservationToJson(value: CheckReservation[]): string {
        return JSON.stringify(value);
    }
}
