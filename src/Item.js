export default function Item({ item, onRemoveItem, onToggleItem }) {
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
