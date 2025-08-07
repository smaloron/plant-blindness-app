import React from "react";

// Demographics questions, all grouped for brevity
const Demographics = ({ value = {}, onChange }) => {
    // Helper for radio group
    const renderRadioGroup = (name, options) => (
        <div className="likert-group">
            {options.map(opt => (
                <label
                    key={opt}
                    className={`likert-label
            ${value[name] === opt ? "selected" : ""}
          `}
                >
                    <input
                        type="radio"
                        name={name}
                        checked={value[name] === opt}
                        onChange={() => onChange({ ...value, [name]: opt })}
                        className="sr-only"
                    />
                    {opt}
                </label>
            ))}
        </div>
    );

    return (
        <div className="radio-list">
            <div>
                <div className="likert-group-label">Votre âge</div>
                {renderRadioGroup("age", [
                    "Moins de 18", "18 à 25", "26 à 35", "36 à 45",
                    "46 à 55", "56 à 65", "66 à 75", "Plus de 75 ans"
                ])}
            </div>
            <div>
                <div className="likert-group-label">Votre sexe</div>
                {renderRadioGroup("gender", [
                    "Femme", "Homme", "Non binaire", "Préfère ne pas dire"
                ])}
            </div>
            <div>
                <div className="likert-group-label">Combien de plantes avez-vous chez vous ? (intérieur)</div>
                {renderRadioGroup("plantsIndoor", [
                    "aucune", "1 à 5", "Plus de 5"
                ])}
            </div>
            <div>
                <div className="likert-group-label">Combien de plantes avez-vous ? (extérieur)</div>
                {renderRadioGroup("plantsOutdoor", [
                    "je n'ai ni balcon ni jardin", "aucune", "1 à 5", "Plus de 5"
                ])}
            </div>
        </div>
    );
};

export default Demographics;
