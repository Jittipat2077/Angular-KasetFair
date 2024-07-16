// To parse this data:
//
//   import { Convert } from "./file";
//
//   const boot = Convert.toBoot(json);
export interface BootReservation {
    totalPrice: number;
    boots:      Boot[];
}

export interface Boot {
    id_boot:     number;
    number_boot: number;
    status_boot: string;
    img_boot:    string;
    price:       number;
    boot_size:   number;
    id_zone:     number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBoot(json: string): Boot[] {
        return JSON.parse(json); // เปลี่ยนเป็น return json; แทน
    }

    public static bootToJson(value: Boot[]): string {
        return JSON.stringify(value);
    }
}

