// To parse this data:
//
//   import { Convert } from "./file";
//
//   const zone = Convert.toZone(json);

export interface Zone {
    id_zone:      number;
    name_zone:    string;
    img_showzone: string;
    img_mapzone:  string;
    boot_count:   number;
    detail_zone:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toZone(json: string): Zone[] {
        return JSON.parse(json);
    }

    public static zoneToJson(value: Zone[]): string {
        return JSON.stringify(value);
    }
}
