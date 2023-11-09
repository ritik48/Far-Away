import { useState } from "react";

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

function App() {
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

function Header() {
    return <div className="header">🌴 FAR AWAY 💼</div>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleForm(e) {
        e.preventDefault();
        onAddItems({ description, quantity });
    }

    return (
        <form className="form" onSubmit={handleForm}>
            <div>What do you need for your 😀 trip ?</div>
            <select
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <input
                className="item-name"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

function Item({ item, onRemoveItem, onToggleItem }) {
    return (
        <li className="item">
            <input
                type="checkbox"
                checked={item.packed}
                onChange={() => onToggleItem(item.id)}
            />
            <div className={`item__info ${item.packed ? "packed" : ""}`}>
                {item.quantity} {item.description}
            </div>
            <button onClick={() => onRemoveItem(item.id)}>❌</button>
        </li>
    );
}

function PackingList({ items, onRemoveItem, onToggleItem, onClearItems }) {
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

function Stats({ items }) {
    if (!items.length) {
        return <div className="stats">Start adding to your list 🚀</div>;
    }

    const totalItems = items.length;
    const totalPacked = items.filter((item) => item.packed).length;
    const percent = Math.round((totalPacked / totalItems) * 100);

    return (
        <div className="stats">
            {percent === 100
                ? "All packed! Ready to go...✅"
                : `💼 You have ${totalItems} items on your list, and you already packed
            ${totalPacked} (${percent}%)`}
        </div>
    );
}

export default App;
