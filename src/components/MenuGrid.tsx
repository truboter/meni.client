import { MenuCard } from "./MenuCard";
import type { MenuItem } from "@/lib/types";
import type { Currency } from "@/lib/currency";

export type GridColumns = 1 | 2 | 3;

interface MenuCardSkeletonProps {
  // Just a placeholder for skeleton
}

function MenuCardSkeleton({}: MenuCardSkeletonProps) {
  return (
    <div className="border border-border rounded-xl p-0 overflow-hidden animate-pulse">
      <div className="h-32 bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-muted rounded w-16" />
          <div className="h-8 w-8 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}

interface MenuGridProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  onQuickAdd?: (item: MenuItem) => void;
  isLoading?: boolean;
  columns?: GridColumns;
  currency: Currency;
  convertPrices: boolean;
  onAnimationStart?: (element: HTMLElement, imageUrl: string) => void;
}

export function MenuGrid({
  items,
  onItemClick,
  onQuickAdd,
  isLoading = false,
  columns = 3,
  currency,
  convertPrices,
  onAnimationStart,
}: MenuGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid gap-4 md:gap-6"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <MenuCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="text-muted-foreground">
          Try selecting a different category or adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-4 md:gap-6"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onClick={() => onItemClick(item)}
          onQuickAdd={() => onQuickAdd?.(item)}
          onAnimationStart={onAnimationStart}
          currency={currency}
          convertPrices={convertPrices}
        />
      ))}
    </div>
  );
}
