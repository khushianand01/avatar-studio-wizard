import { Sparkles, ClipboardPaste, FileText, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface StepTranscriptProps {
  transcript: string;
  onChange: (text: string) => void;
}

export function StepTranscript({ transcript, onChange }: StepTranscriptProps) {
  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  const duration = Math.max(1, Math.round(wordCount / 130));

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-sm">
          <Sparkles className="mr-1.5 h-4 w-4" />
          Generate with AI
        </Button>
        <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:text-foreground">
          <ClipboardPaste className="mr-1.5 h-4 w-4" />
          Paste Script
        </Button>
        <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:text-foreground">
          <FileText className="mr-1.5 h-4 w-4" />
          Import .txt
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChange("")}
          className="border-border text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="mr-1.5 h-4 w-4" />
          Clear
        </Button>
      </div>

      <Textarea
        value={transcript}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Type or paste your script here...\n\nTip: Use [pause] for a 1-second pause, [emphasis] before important words.`}
        className="bg-secondary border-border min-h-[280px] resize-none rounded-xl text-sm leading-relaxed"
      />

      <div className="flex justify-end gap-4 mt-3 text-xs text-muted-foreground">
        <span>{wordCount} words</span>
        <span>~{duration} min video</span>
      </div>
    </div>
  );
}
