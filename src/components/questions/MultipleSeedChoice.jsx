import React from "react";

// value: {id, name} list – can be empty
const MultiSeedChoice = ({ seeds, value, onChange }) => {
    // Secure the input
    const list = Array.isArray(value) ? value : [];

    // Ajoute/retire un élément {id, name}
    const toggleSeed = (seed) => {
        const exists = list.some((s) => s.id === seed.id);
        if (exists) {
            onChange(list.filter((s) => s.id !== seed.id));
        } else {
            onChange([...list, { id: seed.id, name: seed.name }]);
        }
    };

    return (
        <div className="seed-gallery">
            {seeds.map((seed) => {
                const selected = list.some((s) => s.id === seed.id);
                return (
                    <button
                        key={seed.id}
                        className={`seed-item ${selected ? "selected" : ""}`}
                        onClick={() => toggleSeed(seed)}
                        type="button"
                    >
                        <img src={seed.img} alt={seed.name} />
                        <span className="text-green-700 font-semibold">{seed.name}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default MultiSeedChoice;
