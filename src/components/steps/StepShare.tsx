import { Download, Link, MessageCircle, BookmarkPlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WizardState } from "@/store/wizardStore";

const FORMATS = [
  { id: "MP4", label: "MP4", desc: "Standard video" },
  { id: "Vertical Social", label: "Vertical Social", desc: "9:16 for Reels/Shorts" },
  { id: "Square Social", label: "Square Social", desc: "1:1 for feeds" },
];

const DELIVERY = [
  { icon: Link, label: "Copy Share Link" },
  { icon: Download, label: "Download Video" },
  { icon: MessageCircle, label: "Send to WhatsApp" },
  { icon: BookmarkPlus, label: "Save as Template" },
];

interface StepShareProps {
  state: WizardState;
  update: (partial: Partial<WizardState>) => void;
}

export function StepShare({ state, update }: StepShareProps) {
  const avatarName = state.avatarId
    ? state.avatarId.charAt(0).toUpperCase() + state.avatarId.slice(1)
    : "None";

  return (
    <div className="max-w-4xl space-y-8">
      {/* Success banner */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/30">
        <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">Your video is ready.</p>
          <p className="text-xs text-muted-foreground">Export or share it with your team below.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Export Format</label>
            <div className="grid gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => update({ exportFormat: f.id })}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    state.exportFormat === f.id
                      ? "border-primary bg-primary/5 glow-cyan-sm"
                      : "border-border bg-card hover:bg-surface-hover"
                  }`}
                >
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{f.label}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Delivery Options</label>
            <div className="grid grid-cols-2 gap-2">
              {DELIVERY.map((d) => (
                <Button
                  key={d.label}
                  variant="outline"
                  className="justify-start border-border bg-card text-muted-foreground hover:text-foreground hover:bg-surface-hover h-auto py-3"
                >
                  <d.icon className="mr-2 h-4 w-4" />
                  <span className="text-sm">{d.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right – metadata */}
        <div className="surface-card p-6 space-y-4 h-fit">
          <h3 className="text-sm font-semibold text-foreground mb-4">Video Metadata</h3>
          <Meta label="Video Name" value="Loan Reminder — Draft" />
          <Meta label="Created At" value={new Date().toLocaleDateString()} />
          <Meta label="Language" value={state.language} />
          <Meta label="Avatar" value={avatarName} />
          <Meta label="Status" value="Ready to export" />
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}
