import { useForm, UseFormReturn } from "react-hook-form";
import Survey from ".";
import InitSurvey from "./_partials/steps/init-survey";
import SurveyCompleted from "./_partials/steps/survey-completed";
import { SurveySchema, SurveySchemaType } from "@/schemas/survey";
import { createContext, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type Step = (typeof steps)[keyof typeof steps];
type StepKeyType = keyof typeof steps;

const steps = {
  init: {
    component: InitSurvey,
    key: "init",
    next: "questions",
  },
  questions: {
    component: Survey,
    key: "questions",
    next: "results",
  },
  results: {
    component: SurveyCompleted,
    key: "results",
    next: "results",
  },
};
interface SurveyContextProps {
  step: Step;
  setStep: (step: StepKeyType) => void;
  form: UseFormReturn<SurveySchemaType, any, undefined>;
}

const Context = createContext<SurveyContextProps>({} as SurveyContextProps);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  
  const isCompleted = false;

  const form = useForm<SurveySchemaType>({
    resolver: zodResolver(SurveySchema),
  })

  const [step, setStep] = useState<Step>( isCompleted ? steps["results"] : steps["init"]);

  function setStepComponent(step: StepKeyType) {
    setStep(steps[step]);
  }

  return <Context.Provider value={{ step: step, setStep: setStepComponent, form }}>{children}</Context.Provider>;
}

export function useSurvey() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }

  return contextValue;
}
