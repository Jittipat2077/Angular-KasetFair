// To parse this data:
//
//   import { Convert } from "./file";
//
//   const getEvent = Convert.toGetEvent(json);

export interface GetEvent {
    id_date:                number;
    name_festival:          string;
    date_start_reservation: Date;
    date_end_reservation:   Date;
    date_start_festival:    Date;
    date_end_festival:      Date;
    date_start_payment:     Date;
    date_end_payment:       Date;
    status_open_close:      string;
    img_mapzone:            string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toGetEvent(json: string): GetEvent[] {
        return JSON.parse(json);
    }

    public static getEventToJson(value: GetEvent[]): string {
        return JSON.stringify(value);
    }
}
