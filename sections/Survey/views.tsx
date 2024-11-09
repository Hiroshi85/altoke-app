import { useSurvey } from "./context";

export default function SurveyPage(){
    const { step } = useSurvey();
    return <step.component />
}