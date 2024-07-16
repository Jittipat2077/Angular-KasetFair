// To parse this data:
//
//   import { Convert } from "./file";
//
//   const listReservationNotpay = Convert.toListReservationNotpay(json);

export interface ListReservationNotpay {
    id_reservation: number;
    id:             number;
    date_reserva:   Date;
    date_payment:   Date;
    sell:           string;
    img_slip:       null;
    status:         string;
    id_boot:        number;
    number_boot:    number;
    status_boot:    string;
    img_boot:       string;
    price:          number;
    boot_size:      number;
    id_zone:        number;
    firstname:      string;
    lastname:       string;
    email:          string;
    password:       string;
    tel:            number;
    role:           string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toListReservationNotpay(json: string): ListReservationNotpay[] {
        return JSON.parse(json);
    }

    public static listReservationNotpayToJson(value: ListReservationNotpay[]): string {
        return JSON.stringify(value);
    }
}
