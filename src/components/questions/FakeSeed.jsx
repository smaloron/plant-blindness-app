import React from "react";

// Select the seed that does not exist (among real and one fake)
const FakeSeed = ({ seeds, value, onChange }) => (
    <div className="seed-gallery">
        {seeds.map(seed => (
            <button
                key={seed.id}
                className={`seed-item
          ${value === seed.id ? "selected" : ""}`}
                onClick={() => onChange(seed.id)}
                type="button"
            >
                <img src={seed.img} alt={seed.name} className="" />
                <span className="">{seed.name}</span>
            </button>
        ))}
    </div>
);
export default FakeSeed;
