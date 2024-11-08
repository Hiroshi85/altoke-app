import { createContext, useContext, useState } from "react";
import InitRegister from "./init";
import { SectorStep } from "./sector/sector";
import { useForm, UseFormReturn } from "react-hook-form";
import { registerSchema, registerSchemaType } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterContextProps {
  step: Step;
  setStep: (step: StepKeyType) => void;
  form: UseFormReturn<registerSchemaType, any, undefined>
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
    next: "init"
  }
}


type Step = typeof steps[keyof typeof steps];
type StepKeyType = keyof typeof steps;

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  })

  const [step, setStep] = useState<Step>(steps["init"]);

  function setStepComponent(step: StepKeyType) {
    setStep(steps[step]);
  }

  return <Context.Provider value={{ step: step, setStep: setStepComponent, form }}>{children}</Context.Provider>;
}

export function useRegister() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }

  return contextValue;
}