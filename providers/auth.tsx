import {
    deleteStorageItemAsync,
    getStorageItemAsync,
    setStorageItemAsync,
    useStorageState,
} from "@/hooks/useStorageStage";
import { UserData } from "@/types/auth";
import { Href, router, Stack } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export type AuthContextData = {
    authData?: UserData;
    setAuthData: (authData: UserData) => Promise<void>;
    loading: boolean;
    signOut(): Promise<void>;
    signIn(telefono: string, password: string): Promise<AuthStatusResponse>;
};

export interface LoginResponse {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
}

export interface ValidateUserResponse {
    CODE: string;
    user: LoginResponse;
}

export interface AuthStatusResponse {
    redirect: Href<string | object>;
    ok: boolean;
}

export interface IUser {
    "auth-status": string
    metadata: any
    nombre: string
    telefono: string
    authID: string
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const [authData, setAuthData] = useState<UserData | undefined>(undefined);

    useEffect(() => {
        getStorageItemAsync("auth").then(async (data) => {
            if (!data) {
                setLoading(false);
                return;
            }

            const auth = JSON.parse(data) as UserData;
            setAuthData(auth);
            setLoading(false);
        });
    }, []);

    async function setAuth(auth: UserData) {
        setAuthData(auth);
        await setStorageItemAsync("auth", JSON.stringify(auth));
    }

    const signIn = async (telefono: string, password: string): Promise<AuthStatusResponse> => {
        let dataUser: UserData;
        try {
            console.log("SIGN IN", telefono, password);
            const loginResponse = await auth().signInWithEmailAndPassword(telefono + "@gmail.com", password);

            console.log("LOG SENDED")
            console.log("LOGIN USER", loginResponse.user.uid);
            const userRef = (await firestore().collection("users").where("authID", "==", loginResponse.user.uid).get()).docs[0]
            const user = userRef.data() as IUser;
            const id = userRef.id;

            dataUser = {
                id: id,
                telefono: user.telefono,
                nombre: user.nombre,
                "auth-status": user["auth-status"] as "REGISTERED" | "NEW",
                authID: loginResponse.user.uid,
            }
        } catch (e: any) {
            console.log(e);

            console.log("FIREBASE ERROR", e.code);
            if (e.code === "auth/user-not-found") {
                console.log("CREATING USER", telefono, password);
                // NOT THE BEST WAY TO HANDLE THIS
                // IT SHOULD BE DONE IN THE BACKEND 
                const response = await auth().createUserWithEmailAndPassword(telefono + "@gmail.com", password);
                const id = response.user?.uid;
                console.log("CREATED USER", id);

                // Create user in the database
                const newUserRef = await (await firestore().collection("users").add({
                    telefono,
                    nombre: `user-${telefono}`,
                    "auth-status": "NEW",
                })).get();

                const user = newUserRef.data() as IUser;

                dataUser = {
                    id: newUserRef.id,
                    telefono: user.telefono,
                    nombre: user.nombre,
                    "auth-status": user["auth-status"] as "REGISTERED" | "NEW",
                    authID: id,
                }
            } else {
                return {
                    ok: false,
                    redirect: "/login",
                }
            }
        }

        await setAuth(dataUser);

        if (dataUser["auth-status"] === "NEW") {
            return {
                ok: true,
                redirect: "/register",
            };
        }

        return {
            ok: true,
            redirect: "/",
        };
    };

    const signOut = async () => {
        await deleteStorageItemAsync("auth");
        setAuthData(undefined);
        await auth().signOut();
        router.replace("/login");
    };

    function reload() {


    }

    return (
        <AuthContext.Provider value={{ authData, setAuthData: setAuth, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}