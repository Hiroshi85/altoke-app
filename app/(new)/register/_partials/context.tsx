import { createContext, useContext, useState } from "react";
import InitRegister from "./init";
import { SectorStep } from "./sector/sector";
import { useForm, UseFormReturn } from "react-hook-form";
import { registerSchema, registerSchemaType } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import TipoStep from "./tipo";
import MetaStep from "./meta";
import firestore, {GeoPoint} from '@react-native-firebase/firestore';
import { useAuth } from "@/providers/auth";
import { router } from "expo-router";

interface RegisterContextProps {
  step: Step;
  setStep: (step: StepKeyType) => void;
  form: UseFormReturn<registerSchemaType, any, undefined>
  handleSubmit: (data: registerSchemaType) => void;
}

const Context = createContext<RegisterContextProps>({} as RegisterContextProps);

const steps = {
  "init": {
    component: InitRegister,
    key: "init",
    next: "sector"
  },
  "sector": {
    component: SectorStep,
    key: "sector",
    next: "tipo"
  },
  "tipo": {
    component: TipoStep,
    key: "tipo",
    next: "finish"
  },
  "finish": {
    component: MetaStep,
    key: "finish",
    next: "finish"
  }
}


type Step = typeof steps[keyof typeof steps];
type StepKeyType = keyof typeof steps;

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      ventas: 1000
    }
  })

  const [step, setStep] = useState<Step>(steps["init"]);
  const { authData, setAuthData } = useAuth()

  function setStepComponent(step: StepKeyType) {
    setStep(steps[step]);
  }

  async function handleSubmit(data: registerSchemaType) {
    if (!authData?.id) {
      return;
    }


    const emprendimientoRef = await (await firestore().collection('emprendimiento').add({
      direccion: data.negocio.nombre,
      "meta-venta-inicial": data.ventas,
      nombre: data.negocio.nombre,
      sector: data.sector.nombre,
      "ubicacion-geo": new GeoPoint(data.negocio.coordenadas.lat, data.negocio.coordenadas.lng),
      userID: firestore().doc('users/' + authData?.id)
    })).get()

    const emprendimiento = emprendimientoRef.data();

    await firestore().collection('users').doc(authData?.id).update({
      "auth-status": "REGISTERED"
    });

    setAuthData({
      ...authData,
      geo: emprendimiento?.["ubicacion-geo"],
      "auth-status": "REGISTERED"
    });

    router.replace("/");
  }

  return <Context.Provider value={{ step: step, setStep: setStepComponent, form, handleSubmit }}>{children}</Context.Provider>;
}

export function useRegister() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }

  return contextValue;
}