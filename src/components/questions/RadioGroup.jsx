import React from "react";

// Single-choice question with a list of options (radio buttons)
const RadioList = ({ options, value, onChange }) => (
    <div className="radio-list">
        {options.map((opt, i) => (
            <label
                key={opt}
                className={`likert-label
          ${value === opt ? "bg-green-600 text-white" : "bg-white text-green-800"}
        `}
            >
                <input
                    type="radio"
                    value={opt}
                    checked={value === opt}
                    onChange={() => onChange(opt)}
                />
                {opt}
            </label>
        ))}
    </div>
);
export default RadioList;
