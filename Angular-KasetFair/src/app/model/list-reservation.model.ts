export interface Reservation {
    id_reservation: number;
    id:             number;
    date_reserva:   Date;
    date_payment:   Date;
    sell:           string;
    img_slip:       string;
    status:         string;
    total_price:    number;
    boot_count: number;
    boots:          Boot[];
    zone_details:   ZoneDetails;
}

export interface Boot {
    id_boot:     number;
    number_boot: number;
    status_boot: string;
    img_boot:    string;
    price:       number;
    boot_size:   number;
}

export interface ZoneDetails {
    id_zone:      number;
    name_zone:    string;
    img_showzone: string;
    img_mapzone:  string;
    detail_zone:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toReservation(json: string): Reservation[] {
        return JSON.parse(json);
    }

    public static reservationToJson(value: Reservation[]): string {
        return JSON.stringify(value);
    }
}
