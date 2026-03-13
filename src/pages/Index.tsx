import { useWizardStore, STEPS } from "@/store/wizardStore";
import { HeaderBar } from "@/components/HeaderBar";
import { WorkflowSidebar } from "@/components/WorkflowSidebar";
import { StepLayout } from "@/components/StepLayout";
import { StepLanguage } from "@/components/steps/StepLanguage";
import { StepLLM } from "@/components/steps/StepLLM";
import { StepAvatar } from "@/components/steps/StepAvatar";
import { StepTranscript } from "@/components/steps/StepTranscript";
import { StepSubtitle } from "@/components/steps/StepSubtitle";
import { StepPreview } from "@/components/steps/StepPreview";
import { StepShare } from "@/components/steps/StepShare";
import { toast } from "sonner";

const STEP_META = [
  { title: "Select Language", subtitle: "Choose the language for your avatar's voice and generated content.", next: "Next: LLM Config →" },
  { title: "Configure AI Model", subtitle: "Choose your LLM and set generation parameters.", next: "Next: Avatar →" },
  { title: "Choose Your Avatar", subtitle: "Select an AI avatar to represent your brand in the video.", next: "Next: Transcript →" },
  { title: "Add Transcript", subtitle: "Write or generate your video script. Use [pause] for timing, [emphasis] for key words.", next: "Next: Subtitle & Logo →" },
  { title: "Subtitles & Branding", subtitle: "Style your captions and add your company logo.", next: "Next: Preview →" },
  { title: "Preview Video", subtitle: "Review your avatar video before exporting.", next: "Next: Share →" },
  { title: "Share & Export", subtitle: "Export your video or share it with your team.", next: "" },
];

const Index = () => {
  const { state, update, nextStep, prevStep, goToStep, reset, canProceed } = useWizardStore();
  const step = state.currentStep;
  const meta = STEP_META[step];

  const handleCreateVideo = () => {
    reset();
    toast.success("New video draft started!");
  };

  const handleExport = () => {
    toast.success("Video exported successfully! 🎬");
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepLanguage
            selected={state.language}
            onSelect={(lang) => update({ language: lang, outputLanguage: lang })}
          />
        );
      case 1:
        return <StepLLM state={state} update={update} />;
      case 2:
        return (
          <StepAvatar
            selectedId={state.avatarId}
            filter={state.avatarFilter}
            onSelect={(id) => update({ avatarId: id })}
            onFilterChange={(f) => update({ avatarFilter: f })}
          />
        );
      case 3:
        return <StepTranscript transcript={state.transcript} onChange={(t) => update({ transcript: t })} />;
      case 4:
        return <StepSubtitle state={state} update={update} />;
      case 5:
        return <StepPreview state={state} update={update} />;
      case 6:
        return <StepShare state={state} update={update} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <HeaderBar onCreateVideo={handleCreateVideo} />
      <div className="flex flex-1 overflow-hidden">
        <WorkflowSidebar currentStep={step} onStepClick={goToStep} />
        <StepLayout
          step={step}
          title={meta.title}
          subtitle={meta.subtitle}
          onNext={nextStep}
          onBack={prevStep}
          nextLabel={meta.next}
          canProceed={canProceed()}
          isLast={step === STEPS.length - 1}
          lastAction={handleExport}
          lastLabel="Export Video"
        >
          {renderStep()}
        </StepLayout>
      </div>
    </div>
  );
};

export default Index;
