import React from "react";

// 4-point Likert + "already knew"
const scaleLabels = [
    "Oui, tout à fait",
    "Oui, un peu",
    "Non, pas vraiment",
    "Non, pas du tout",
    "Je connaissais déjà"
];

// Props: items (array of question strings), value (array), onChange
const LikertGroup = ({ items, value = [], onChange }) => {
    const handleChange = (qIdx, score) => {
        const newVal = [...value];
        newVal[qIdx] = score;
        onChange(newVal);
    };

    return (
        <div className="radio-list">
            {items.map((item, i) => (
                <div key={i}>
                    <p className="likert-group-label">{item}</p>
                    <div className="likert-group">
                        {scaleLabels.map((label, j) => (
                            <label
                                key={j}
                                className={`likert-label
                  ${value[i] === j ? "selected" : ""}
                `}
                            >
                                <input
                                    type="radio"
                                    name={`likert-${i}`}
                                    value={j}
                                    checked={value[i] === j}
                                    onChange={() => handleChange(i, j)}
                                    className="sr-only"
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default LikertGroup;
