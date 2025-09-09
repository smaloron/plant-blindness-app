// variables en anglais, commentaires en français
import React from "react";

const AgreeDisagreeList = ({ statements, value = {}, onChange }) => {
    // tableau des options possibles
    const options = [
        { label: "oui", value: "oui" },
        { label: "non", value: "non" },
        { label: "je ne sais pas", value: "ne sais pas" }
    ];

    // gestion du changement de valeur pour une question
    const handleChange = (statement, val) => {
        onChange({ ...value, [statement]: val });
    };

    return (
        <div className="radio-list">
            {statements.map((st) => (
                <div key={st} className="likert-item">
                    <p className="likert-group-label">{st}</p>
                    <div
                        className="agree-group"
                    >
                        {options.map((opt) => (
                            <label
                                key={opt.value}
                                className={`agree-label ${
                                    value[st] === opt.value ? "selected" : ""
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={st}
                                    value={opt.value}
                                    checked={value[st] === opt.value}
                                    onChange={() => handleChange(st, opt.value)}
                                />
                                <span className="ml-1">{opt.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AgreeDisagreeList;
