import React from "react";

const scaleLabels = [
    "Oui, tout à fait",
    "Oui, un peu",
    "Non, pas vraiment",
    "Non, pas du tout",
    "Je connaissais déjà",
];

const LikertGroup = ({ items, value = [], onChange }) => {
    // Select a label for the question i
    const handleChange = (qIdx, label) => {
        // Normalize into an array of objects {question, answer}
        const next = items.map((q, i) => {
            const v = value[i];
            const ans = v?.answer ?? (typeof v === "string" ? v : undefined);
            return { question: q, answer: ans };
        });
        next[qIdx] = { question: items[qIdx], answer: label };
        onChange(next);
    };

    return (
        <div className="radio-list">
            {items.map((item, i) => {
                const current =
                    value[i]?.answer ??
                    (typeof value[i] === "string" ? value[i] : undefined);
                return (
                    <div key={i}>
                        <p className="likert-group-label">{item}</p>
                        <div className="likert-group">
                            {scaleLabels.map((label) => (
                                <label
                                    key={label}
                                    className={`likert-label ${
                                        current === label ? "selected" : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={`likert-${i}`}
                                        value={label}
                                        checked={current === label}
                                        onChange={() => handleChange(i, label)}
                                        className="sr-only"
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LikertGroup;
