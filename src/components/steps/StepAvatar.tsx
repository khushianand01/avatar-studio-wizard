import { Check, Plus, Crown } from "lucide-react";

const AVATARS = [
  { id: "priya", name: "Priya S.", category: "Corporate", emoji: "👩🏽‍💼" },
  { id: "arjun", name: "Arjun M.", category: "Corporate", emoji: "👨🏽‍💼" },
  { id: "sarah", name: "Sarah K.", category: "Casual", emoji: "👩🏼" },
  { id: "david", name: "David R.", category: "Casual", emoji: "👨🏻" },
  { id: "aisha", name: "Aisha N.", category: "Corporate", emoji: "👩🏾‍💼" },
  { id: "raj", name: "Raj P.", category: "Casual", emoji: "👨🏽" },
  { id: "mia", name: "Mia L.", category: "Animated", emoji: "🧚‍♀️" },
  { id: "zara", name: "Zara T.", category: "3D", emoji: "🤖" },
];

const FILTERS = ["All", "Corporate", "Casual", "Animated", "3D"];

interface StepAvatarProps {
  selectedId: string;
  filter: string;
  onSelect: (id: string) => void;
  onFilterChange: (f: string) => void;
}

export function StepAvatar({ selectedId, filter, onSelect, onFilterChange }: StepAvatarProps) {
  const filtered = filter === "All" ? AVATARS : AVATARS.filter((a) => a.category === filter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((avatar) => {
          const isSelected = selectedId === avatar.id;
          return (
            <button
              key={avatar.id}
              onClick={() => onSelect(avatar.id)}
              className={`relative group p-6 rounded-xl border text-center transition-all duration-200 hover:scale-[1.02] ${
                isSelected
                  ? "glow-cyan-border border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-surface-hover"
              }`}
            >
              <div className="text-4xl mb-3">{avatar.emoji}</div>
              <p className="text-sm font-semibold text-foreground">{avatar.name}</p>
              <p className="text-xs text-muted-foreground">{avatar.category}</p>
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </span>
              )}
            </button>
          );
        })}

        {/* Upload Custom */}
        <button className="relative p-6 rounded-xl border border-dashed border-border bg-card hover:bg-surface-hover text-center transition-all duration-200 hover:scale-[1.02] hover:border-muted-foreground/40">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground">Upload Custom</p>
          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
            <Crown className="h-3 w-3" /> Pro
          </span>
        </button>
      </div>
    </div>
  );
}
