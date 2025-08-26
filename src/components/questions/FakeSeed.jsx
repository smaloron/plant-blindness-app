import React from "react";

// Select the seed that does not exist (among real and one fake)
const FakeSeed = ({ seeds, value, onChange }) => (
    <div className="seed-gallery">
        {seeds.map(seed => (
            <button
                key={seed.id}
                className={`seed-item ${value?.id === seed.id ? "selected" : ""}`}
                onClick={() => onChange({id: seed.id, name: seed.name})}
                type="button"
            >
                <img src={seed.img} alt={seed.name} className="" />
            </button>
        ))}
    </div>
);
export default FakeSeed;
