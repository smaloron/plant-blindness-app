import React from "react";

/* Affiche 1 graine (par id) + 3 mots-clés */
const SeedThreeWords = ({
                            seeds = [],
                            seedId = null,
                            value = { seedId: null, words: ["", "", ""] },
                            onChange,
                        }) => {
    // graine sélectionnée via l'id passé en props
    const seed = seeds.find((s) => s.id === seedId) || null;
    console.log(seed);

    // met à jour un mot
    const handleWordChange = (i, word) => {
        const words = [...(value.words || ["", "", ""])];
        words[i] = word;
        onChange?.({ ...value, seedId, words });
    };

    return (
        <div>
            {/* bloc image agrandie, sans libellé */}
            {seed && (
                <div className="seed-item-large">
                    <img
                        src={seed.img}
                        alt={seed.name || "Graine"}
                        className="seed-img-large"
                    />
                </div>
            )}

            <div style={{ display: "flex", gap: "0.7rem" }}>
                {[0, 1, 2].map((i) => (
                    <input
                        key={i}
                        type="text"
                        value={value.words?.[i] || ""}
                        onChange={(e) => handleWordChange(i, e.target.value)}
                        placeholder={`Mot ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SeedThreeWords;
