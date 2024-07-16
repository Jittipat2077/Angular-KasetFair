// To parse this data:
//
//   import { Convert, BootReservation } from "./file";
//
//   const bootReservation = Convert.toBootReservation(json);

export interface BootReservation {
    totalPrice: number;
    boots:      Boot[];
}

export interface Boot {
    id_boot:        number;
    number_boot:    number;
    status_boot:    string;
    img_boot:       string;
    price:          number;
    boot_size:      number;
    id_zone:        number;
    id_reservation: null;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBootReservation(json: string): BootReservation {
        return JSON.parse(json);
    }

    public static bootReservationToJson(value: BootReservation): string {
        return JSON.stringify(value);
    }
}
