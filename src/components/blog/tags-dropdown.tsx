import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tags, X } from "lucide-react";
import { blogPosts } from "@/data/blog-data";

interface TagsDropdownProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onClearAll: () => void;
}

export function TagsDropdown({
  selectedTags,
  onTagSelect,
  onTagRemove,
  onClearAll,
}: TagsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Get all unique tags from blog posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2"
          >
            <Tags className="h-4 w-4" />
            Tags
            {selectedTags.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedTags.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
          <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {selectedTags.length > 0 && (
            <>
              <div className="p-2">
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="default"
                      className="text-xs cursor-pointer hover:bg-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTagRemove(tag);
                      }}
                    >
                      {tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearAll}
                  className="w-full text-xs"
                >
                  Clear All
                </Button>
              </div>
              <DropdownMenuSeparator />
            </>
          )}

          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <DropdownMenuItem
                key={tag}
                onClick={() => {
                  if (isSelected) {
                    onTagRemove(tag);
                  } else {
                    onTagSelect(tag);
                  }
                }}
                className={`cursor-pointer ${
                  isSelected ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{tag}</span>
                  {isSelected && (
                    <Badge variant="secondary" className="ml-2">
                      ✓
                    </Badge>
                  )}
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}