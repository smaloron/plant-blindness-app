import React from "react";

/* Liste multi-choix (checkbox)
   - options: string[]
   - value: string[] (valeurs cochées)
   - onChange: (next: string[]) => void
*/
const CheckboxList = ({ options = [], value = [], onChange }) => {
    // toggle une option (ajoute/retire du tableau)
    const handleToggle = (opt, checked) => {
        const set = new Set(value || []);
        if (checked) set.add(opt);
        else set.delete(opt);
        onChange?.(Array.from(set));
    };

    return (
        <div className="radio-list">
            {options.map((opt) => {
                const checked = value?.includes(opt);
                return (
                    <label
                        key={opt}
                        className={`likert-label ${checked ? "selected" : ""}`}
                    >
                        <input
                            type="checkbox"
                            value={opt}
                            checked={checked}
                            onChange={(e) => handleToggle(opt, e.target.checked)}
                        />
                        {opt}
                    </label>
                );
            })}
        </div>
    );
};

export default CheckboxList;
