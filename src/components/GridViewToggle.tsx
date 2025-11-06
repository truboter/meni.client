export type GridColumns = 1 | 2 | 3

interface GridViewToggleProps {
  value: GridColumns
  onChange: (value: GridColumns) => void
}

export function GridViewToggle({ value, onChange }: GridViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      {[1, 2, 3].map((cols) => (
        <button
          key={cols}
          onClick={() => onChange(cols as GridColumns)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            value === cols
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {cols}
        </button>
      ))}
    </div>
  )
}
