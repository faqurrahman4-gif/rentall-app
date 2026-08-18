import type { Item } from "../../types";
import ItemCard from "./ItemCard";

interface ItemGridProps {
  items: Item[];
  columns?: 1 | 2;
}

export default function ItemGrid({ items, columns = 2 }: ItemGridProps) {
  if (columns === 1) {
    return (
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
