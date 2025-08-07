import React from "react";

// Single-choice question with a list of options (radio buttons)
const RadioList = ({ options, value, onChange }) => (
    <div className="radio-list">
        {options.map((opt) => (
            <label
                key={opt}
                className={`likert-label
          ${value === opt ? "selected" : ""}
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
