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

export type AuthContextData = {
    authData?: UserData;
    setAuthData: (authData: UserData) => Promise<void>;
    loading: boolean;
    signOut(): Promise<void>;
    signIn(id: string): Promise<AuthStatusResponse>;
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

    const signIn = async (id: string): Promise<AuthStatusResponse> => {
        const user = (await firestore().collection('users').doc(id).get()).data();

        if (!user) {
            throw new Error("User not found");
        }

        // Simulates data from firebase
        const dataUser: UserData = {
            id: id,
            telefono: user.telefono,
            nombre: user.nombre,
            "auth-status": user["auth-status"],
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