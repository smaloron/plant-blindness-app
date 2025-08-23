const MultiSeedChoice = ({ seeds, value = [], onChange }) => {
    const toggleSeed = (id) => {
        if (value.includes(id)) onChange(value.filter(i => i !== id));
        else onChange([...value, id]);
    };
    return (
        <div className="seed-gallery">
            {seeds.map(seed => (
                <button
                    key={seed.id}
                    type="button"
                    className={`seed-item
            ${value.includes(seed.id) ? "selected" : ""}`}
                    onClick={() => toggleSeed(seed.id)}
                >
                    <img src={seed.img} alt={seed.name} className="h-24 w-auto mb-2 rounded-xl object-cover" />
                    <span className="text-green-700 font-semibold">{seed.name}</span>
                </button>
            ))}
        </div>
    );
};
export default MultiSeedChoice;
