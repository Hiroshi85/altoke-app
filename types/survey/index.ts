export interface SurveyOption {
    label: string;
    summary?: string;
    value: number | string;
}

export interface SurveyQuestion {
    id: string;
    key: string;
    question: string;
    options: SurveyOption[];
    type: "radio" | "select" | "text";
}