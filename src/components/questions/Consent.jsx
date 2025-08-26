import React from "react";

const Consent = ({ value, onChange }) => (
    <div className="radio-list">
        <label className={`likert-label
      ${value === true ? "selected" : ""}`}>
            <input
                type="radio"
                checked={value === true}
                onChange={() => onChange(true)}
            />
            Oui, je donne mon accord pour que mes réponses soient gardées
        </label>
        <label className={`likert-label
      ${value === false ? "selected" : ""}`}>
            <input
                type="radio"
                checked={value === false}
                onChange={() => onChange(false)}
            />
            Non, je ne donne pas mon accord
        </label>
    </div>
);

export default Consent;
