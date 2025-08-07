import React from "react";

// Props: seeds, value, onChange
const SingleSeedChoice = ({ seeds, value, onChange }) => (
    <div className="seed-gallery">
        {seeds.map(seed => (
            <button
                key={seed.id}
                className={`seed-gallery__item
          ${value === seed.id ? "seed-gallery__item--selected" : ""}`}
                onClick={() => onChange(seed.id)}
                type="button"
            >
                <img src={seed.img} alt={seed.name} className="h-24 w-auto mb-2 rounded-xl object-cover" />
                <span className="text-green-700 font-semibold">{seed.name}</span>
            </button>
        ))}
    </div>
);

export default SingleSeedChoice;
