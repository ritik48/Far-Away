export default function Stats({ items }) {
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
