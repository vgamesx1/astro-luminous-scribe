import { useState } from "react";
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
import { Grid3X3, X } from "lucide-react";

const categories = [
  "Technology",
  "Web Development",
  "Programming",
  "Design",
  "Tutorial",
  "News",
  "Opinion",
  "Career"
];

interface CategoriesDropdownProps {
  selectedCategories: string[];
  onCategorySelect: (category: string) => void;
  onCategoryRemove: (category: string) => void;
  onClearAll: () => void;
}

export function CategoriesDropdown({
  selectedCategories,
  onCategorySelect,
  onCategoryRemove,
  onClearAll,
}: CategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2"
          >
            <Grid3X3 className="h-4 w-4" />
            Categories
            {selectedCategories.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedCategories.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-64 max-h-80 overflow-y-auto z-50" 
          align="start" 
          sideOffset={4}
          side="bottom"
          avoidCollisions={true}
          collisionPadding={8}
        >
          <DropdownMenuLabel>Filter by Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {selectedCategories.length > 0 && (
            <>
              <div className="p-2">
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="default"
                      className="text-xs cursor-pointer hover:bg-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCategoryRemove(category);
                      }}
                    >
                      {category}
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

          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <DropdownMenuItem
                key={category}
                onClick={() => {
                  if (isSelected) {
                    onCategoryRemove(category);
                  } else {
                    onCategorySelect(category);
                  }
                }}
                className={`cursor-pointer ${
                  isSelected ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{category}</span>
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