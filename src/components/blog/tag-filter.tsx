import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onClearAll: () => void;
}

export function TagFilter({
  tags,
  selectedTags,
  onTagSelect,
  onTagRemove,
  onClearAll,
}: TagFilterProps) {
  return (
    <div className="space-y-4">
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground">
            Active filters:
          </span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="bg-primary text-primary-foreground gap-1 cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => onTagRemove(tag)}
            >
              {tag}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => {
                if (isSelected) {
                  onTagRemove(tag);
                } else {
                  onTagSelect(tag);
                }
              }}
            >
              {tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}