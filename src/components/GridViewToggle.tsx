import { SquaresFour, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type GridColumns = 1 | 2 | 3;

interface GridViewToggleProps {
  value: GridColumns;
  onChange: (value: GridColumns) => void;
}

export function GridViewToggle({ value, onChange }: GridViewToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SquaresFour size={20} weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!bg-white z-[100]">
        {[1, 2, 3].map((cols) => (
          <DropdownMenuItem
            key={cols}
            onClick={() => onChange(cols as GridColumns)}
            className="cursor-pointer"
          >
            <Check
              size={16}
              weight="bold"
              className={value === cols ? "mr-2" : "mr-2 opacity-0"}
            />
            {cols} {cols === 1 ? "column" : "columns"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
