import { useState, useCallback } from "react";

export interface WizardState {
  currentStep: number;
  language: string;
  llmModel: string;
  outputLanguage: string;
  videoTone: string;
  temperature: number;
  systemPrompt: string;
  avatarId: string;
  avatarFilter: string;
  transcript: string;
  subtitleColor: string;
  subtitlePosition: string;
  subtitleLanguage: string;
  logoPosition: string;
  logoOpacity: number;
  aspectRatio: string;
  exportFormat: string;
}

const defaultState: WizardState = {
  currentStep: 0,
  language: "English",
  llmModel: "Claude 3.5 Sonnet",
  outputLanguage: "English",
  videoTone: "Professional",
  temperature: 50,
  systemPrompt: "",
  avatarId: "",
  avatarFilter: "All",
  transcript: `Namaste {{customer_name}}. This is a reminder regarding your loan account {{lan}} with {{client_name}}. Your total outstanding amount is {{tos}}. Please make the payment at the earliest to avoid any additional charges. For assistance, call our helpline at 1800-XXX-XXXX. Thank you.`,
  subtitleColor: "White",
  subtitlePosition: "Bottom",
  subtitleLanguage: "English",
  logoPosition: "Top Right",
  logoOpacity: 80,
  aspectRatio: "16:9",
  exportFormat: "MP4",
};

export const STEPS = [
  { label: "Language", key: "language" },
  { label: "LLM Config", key: "llm" },
  { label: "Avatar", key: "avatar" },
  { label: "Transcript", key: "transcript" },
  { label: "Subtitle & Logo", key: "subtitle" },
  { label: "Preview", key: "preview" },
  { label: "Share", key: "share" },
] as const;

export function useWizardStore() {
  const [state, setState] = useState<WizardState>(defaultState);

  const update = useCallback((partial: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, STEPS.length - 1) }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 0) }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: Math.max(0, Math.min(step, STEPS.length - 1)) }));
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  const canProceed = useCallback((): boolean => {
    const s = state;
    switch (s.currentStep) {
      case 2: return !!s.avatarId;
      case 3: return s.transcript.trim().length > 0;
      default: return true;
    }
  }, [state]);

  return { state, update, nextStep, prevStep, goToStep, reset, canProceed };
}
