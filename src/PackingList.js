import { useState } from "react";
import Item from "./Item";

export default function PackingList({
    items,
    onRemoveItem,
    onToggleItem,
    onClearItems,
}) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") sortedItems = items;

    if (sortBy === "description") {
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));
    }

    if (sortBy === "packed") {
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    return (
        <div className="packing-list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onRemoveItem={onRemoveItem}
                        onToggleItem={onToggleItem}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    name="sortby"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input">sort by input</option>
                    <option value="description">sort by description</option>
                    <option value="packed">sort by packed</option>
                </select>

                <button className="clear" onClick={onClearItems}>
                    Clear List
                </button>
            </div>
        </div>
    );
}
