// To parse this data:
//
//   import { Convert } from "./file";
//
//   const listReservationApprove = Convert.toListReservationApprove(json);

export interface ListReservationApprove {
    id_reservation: number;
    id:             number;
    date_reserva:   Date;
    date_payment:   Date;
    sell:           string;
    img_slip:       string;
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
    public static toListReservationApprove(json: string): ListReservationApprove[] {
        return JSON.parse(json);
    }

    public static listReservationApproveToJson(value: ListReservationApprove[]): string {
        return JSON.stringify(value);
    }
}
