// To parse this data:
//
//   import { Convert } from "./file";
//
//   const listAllUser = Convert.toListAllUser(json);

export interface ListAllUser {
    id:        number;
    firstname: number | string;
    lastname:  number | string;
    email:     string;
    password:  number | string;
    tel:       number | string;
    role:      Role;
}

export enum Role {
    Admin = "admin",
    User = "user",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toListAllUser(json: string): ListAllUser[] {
        return JSON.parse(json);
    }

    public static listAllUserToJson(value: ListAllUser[]): string {
        return JSON.stringify(value);
    }
}
