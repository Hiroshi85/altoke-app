export type UserData = {
    id: string;
    telefono:string;
    nombre: string;
    "auth-status": "NEW" | "REGISTERED";
    authID?: string;
}