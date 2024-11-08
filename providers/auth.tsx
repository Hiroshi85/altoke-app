import {
    deleteStorageItemAsync,
    getStorageItemAsync,
    setStorageItemAsync,
    useStorageState,
} from "@/hooks/useStorageStage";
import { UserData } from "@/types/auth";
import { Href, router, Stack } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextData = {
    authData?: UserData;
    setAuthData: (authData: UserData) => void;
    loading: boolean;
    signOut(): Promise<void>;
    signIn(): Promise<AuthStatusResponse>;
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

    const signIn = async (): Promise<AuthStatusResponse> => {

        // Simulates data from firebase
        const dataUser: UserData = {
            id: "abcd",
            telefono: "987654321",
            // name: "John Doe",
            nombre: "Test User",
            "auth-status": "NEW",
        }

        setAuthData(dataUser);
        await setStorageItemAsync("auth", JSON.stringify(dataUser));


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

    return (
        <AuthContext.Provider value={{ authData, setAuthData, loading, signIn, signOut }}>
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