import { Plus, LayoutTemplate, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderBarProps {
  onCreateVideo: () => void;
}

export function HeaderBar({ onCreateVideo }: HeaderBarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <h1 className="font-display text-xl font-bold tracking-tight">
        <span className="text-foreground">Avatar</span>
        <span className="text-primary">Studio</span>
      </h1>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Template Library
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Video className="mr-2 h-4 w-4" />
          My Videos
        </Button>
        <Button
          size="sm"
          onClick={onCreateVideo}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-sm font-semibold"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Create Video
        </Button>
      </div>
    </header>
  );
}
