import React, { useState, useEffect, useRef, useMemo, ReactNode } from "react";

interface MasonryProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
  gap?: number;
  columns?: Record<number, number>; // e.g. { 0: 1, 640: 2, 1024: 3, 1280: 4 }
}

export function Masonry<T>({ items, renderItem, keyExtractor, gap = 10, columns = { 0: 1, 640: 2, 1024: 3, 1280: 4 } }: MasonryProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [colCount, setColCount] = useState(1);
  const [itemHeights, setItemHeights] = useState<Record<string, number>>({});
  
  // Update column count based on container width
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      let currentCols = 1;
      const breakpoints = Object.keys(columns).map(Number).sort((a, b) => a - b);
      for (const bp of breakpoints) {
        if (width >= bp) {
          currentCols = columns[bp];
        }
      }
      setColCount(currentCols);
    });
    
    observer.observe(container);
    return () => observer.disconnect();
  }, [columns]);

  const handleResize = React.useCallback((id: string, height: number) => {
    setItemHeights(prev => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  // Distribute items into columns
  const columnData = useMemo(() => {
    const cols: T[][] = Array.from({ length: colCount }, () => []);
    const colHeights = Array(colCount).fill(0);

    items.forEach((item) => {
      const key = keyExtractor(item);
      const height = itemHeights[key] || 250; // fallback height
      
      // Find shortest column
      let minHeight = colHeights[0];
      let minIndex = 0;
      for (let i = 1; i < colCount; i++) {
        if (colHeights[i] < minHeight) {
          minHeight = colHeights[i];
          minIndex = i;
        }
      }

      cols[minIndex].push(item);
      colHeights[minIndex] += height + gap;
    });

    return cols;
  }, [items, colCount, itemHeights, gap, keyExtractor]);

  return (
    <div ref={containerRef} className="w-full flex items-start" style={{ gap: `${gap}px` }}>
      {columnData.map((colItems, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col" style={{ gap: `${gap}px`, minWidth: 0 }}>
          {colItems.map((item, index) => {
            const key = keyExtractor(item);
            return (
              <MasonryItem 
                key={key} 
                id={key} 
                onResize={handleResize}
              >
                {renderItem(item, index)}
              </MasonryItem>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const MasonryItem = React.memo(({ children, id, onResize }: { children: ReactNode, id: string, onResize: (id: string, height: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const onResizeRef = useRef(onResize);
  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new ResizeObserver(() => {
      onResizeRef.current(id, el.offsetHeight);
    });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return <div ref={ref} className="w-full min-w-0" style={{ minWidth: 0 }}>{children}</div>;
});
