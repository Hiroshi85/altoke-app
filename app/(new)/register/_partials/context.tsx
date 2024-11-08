import { createContext, useContext, useState } from "react";
import InitRegister from "./init";

interface RegisterContextProps {
  step: Step;
  setStep: (step: StepKeyType) => void;
}

const Context = createContext<RegisterContextProps>({} as RegisterContextProps);

const steps = {
  "init": {
    component: InitRegister,
    key: "init"

  }
}


type Step = typeof steps[keyof typeof steps];
type StepKeyType = keyof typeof steps;

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>(steps["init"]);

  function setStepComponent(step: StepKeyType) {
    setStep(steps[step]);
  }

  return <Context.Provider value={{ step: step, setStep: setStepComponent }}>{children}</Context.Provider>;
}

export function useRegister() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }

  return contextValue;
}