import { useState } from "react";
import Stats from "./Stats";
import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";

let initialItems = [
    {
        id: 1,
        description: "Passports",
        quantity: 2,
        packed: false,
    },
    {
        id: 2,
        description: "Charger",
        quantity: 1,
        packed: true,
    },
    {
        id: 3,
        description: "Shirts",
        quantity: 4,
        packed: false,
    },
];

export default function App() {
    const [items, setItems] = useState(initialItems);

    function handleAddItems({ description, quantity }) {
        setItems((items) => [
            ...items,
            { id: Date.now(), description, quantity, packed: false },
        ]);
    }

    function handleRemoveItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function handleClearItems() {
        const confirm = window.confirm("Are you sure ?");
        if (confirm) setItems([]);
    }

    return (
        <div className="container">
            <Header />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onRemoveItem={handleRemoveItem}
                onToggleItem={handleToggleItem}
                onClearItems={handleClearItems}
            />
            <Stats items={items} />
        </div>
    );
}
