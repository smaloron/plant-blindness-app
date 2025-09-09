import React, { useMemo } from "react";

/* Liste multi-choix (checkbox)
   - options: string[] (la dernière = "autre chose")
   - value: string[] (valeurs cochées)
   - onChange: (next: string[]) => void
*/
const CheckboxList = ({ options = [], value = [], onChange }) => {
    // libellé "autre chose" (dernière option)
    const otherLabel = options[options.length - 1] || "autre chose";

    // extrait la saisie depuis "autre chose: xxx" si présent
    const otherState = useMemo(() => {
        const entry = (value || []).find((v) =>
            v.toLowerCase().startsWith("autre chose")
        );
        if (!entry) return { checked: false, text: "" };
        const parts = entry.split(":");
        const text = parts.slice(1).join(":").trim();
        return { checked: true, text };
    }, [value]);

    // renvoie une nouvelle liste sans aucune entrée "autre chose*"
    const stripOther = (arr = []) =>
        arr.filter((v) => !v.toLowerCase().startsWith("autre chose"));

    // toggle une option standard
    const handleToggle = (opt, checked) => {
        // cas "autre chose" traité à part
        if (opt === otherLabel) {
            const base = stripOther(value || []);
            if (checked) {
                // ajoute "autre chose: <texte>" (texte courant ou vide)
                const text = otherState.text || "";
                const payload =
                    text ? `${otherLabel}: ${text}` : otherLabel;
                onChange?.([...base, payload]);
            } else {
                onChange?.(base);
            }
            return;
        }

        // options classiques
        const set = new Set(value || []);
        if (checked) set.add(opt);
        else set.delete(opt);

        // éviter doublon avec "autre chose..."
        onChange?.(stripOther(Array.from(set)));
    };

    // MAJ du champ texte "autre chose"
    const handleOtherText = (txt) => {
        const base = stripOther(value || []);
        if (!otherState.checked) {
            // si non coché, on ne pousse rien
            onChange?.(base);
            return;
        }
        const payload = txt
            ? `${otherLabel}: ${txt}`
            : otherLabel;
        onChange?.([...base, payload]);
    };

    return (
        <div className="radio-list">
            {options.map((opt, idx) => {
                const isOther = idx === options.length - 1;
                const checked = isOther
                    ? otherState.checked
                    : (value || []).includes(opt);

                return (
                    <div key={opt} className="likert-item">
                        <label
                            className={`likert-label ${checked ? "selected" : ""}`}
                            style={{ display: "inline-flex", alignItems: "center",
                                gap: ".5rem", marginRight: "1rem" }}
                        >
                            <input
                                type="checkbox"
                                value={opt}
                                checked={checked}
                                onChange={(e) =>
                                    handleToggle(opt, e.target.checked)
                                }
                            />
                            {opt}
                        </label>

                        {/* champ texte pour "autre chose" lorsqu'il est coché */}
                        {isOther && checked && (
                            <input
                                type="text"
                                value={otherState.text}
                                placeholder="Précisez…"
                                onChange={(e) => handleOtherText(e.target.value)}
                                style={{ minWidth: "22rem" }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CheckboxList;
