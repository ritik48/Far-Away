import { useState } from "react";

export default function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleForm(e) {
        e.preventDefault();
        onAddItems({ description, quantity });

        setDescription("");
        setQuantity(1);
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
