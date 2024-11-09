import { GeoPoint } from "@react-native-firebase/firestore";

export type UserData = {
    id: string;
    telefono:string;
    nombre: string;
    geo?: GeoPoint;
    "auth-status": "NEW" | "REGISTERED";
    authID?: string;
}