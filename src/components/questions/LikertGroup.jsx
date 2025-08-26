import React from "react";

/* Étiquettes de l'échelle */
const scaleLabels = [
    "Non, pas du tout",
    "Non, pas vraiment",
    "Oui, un peu",
    "Oui, tout à fait",
];

/* Groupe Likert : options radio horizontales */
const LikertGroup = ({ items, value = [],scaleLabels = [], onChange }) => {
    // met à jour la réponse à la question qIdx
    const handleChange = (qIdx, label) => {
        // normalise vers { question, answer }
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

                        {/* ajout de la classe horizontal */}
                        <div className="likert-group horizontal">
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
