// To parse this data:
//
//   import { Convert } from "./file";
//
//   const account = Convert.toAccount(json);

export interface Account {
    id:        number;
    firstname: string;
    lastname:  string;
    email:     string;
    password:  string;
    tel:       number;
    role:      string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAccount(json: string): Account[] {
        return JSON.parse(json);
    }

    public static accountToJson(value: Account[]): string {
        return JSON.stringify(value);
    }
}
