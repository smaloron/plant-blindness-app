import React from "react";

// Props: seeds, value, onChange
const SingleSeedChoice = ({ seeds, value, onChange }) => (
    <div className="seed-gallery">
        {seeds.map(seed => (
            <button
                key={seed.id}
                className={`seed-item ${value?.id === seed.id ? "selected" : ""}`}
                onClick={() => onChange({id: seed.id, name: seed.name})}
                type="button"
            >
                <img src={seed.img} alt={seed.name} />
                <span className="text-green-700 font-semibold">{seed.name}</span>
            </button>
        ))}
    </div>
);

export default SingleSeedChoice;
