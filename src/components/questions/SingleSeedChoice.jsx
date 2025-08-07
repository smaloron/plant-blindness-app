import React from "react";

// Props: seeds, value, onChange
const SingleSeedChoice = ({ seeds, value, onChange }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {seeds.map(seed => (
            <button
                key={seed.id}
                className={`border rounded-2xl p-2 flex flex-col items-center shadow
          transition bg-white hover:bg-green-50
          ${value === seed.id ? "ring-2 ring-green-500" : ""}`}
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
