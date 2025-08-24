import React from "react";

const SeedThreeWords = ({ seeds, value = { seedId: null, words: ["", "", ""] }, onChange }) => {
    const handleSeedSelect = (seed) => {
        console.log(seed);
        onChange({ ...value, seed });
        console.log(value);
    };
    const handleWordChange = (i, word) => {
        const newWords = [...(value.words || ["", "", ""])];
        newWords[i] = word;
        onChange({ ...value, words: newWords });
    };

    return (
        <div>
            <div className="mb-4">
                <p className="mb-2">Sélectionnez une graine :</p>
                <div className="seed-gallery">
                    {seeds.map(seed => (
                        <button
                            key={seed.id}
                            type="button"
                            className={`seed-item ${value && value?.seed.id === seed.id ? "selected" : ""}`}
                            onClick={() => handleSeedSelect({id: seed.id, name: seed.name})}
                        >
                            <img src={seed.img} alt={seed.name}/>
                            <span >{seed.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            {value.seed?.id &&
                <div className="flex gap-2 mt-2">
                    {[0,1,2].map(i => (
                        <input
                            key={i}
                            type="text"
                            className="border rounded-lg p-2 flex-1 focus:ring-green-400"
                            value={value.words?.[i] || ""}
                            onChange={e => handleWordChange(i, e.target.value)}
                            placeholder={`Mot ${i+1}`}
                        />
                    ))}
                </div>
            }
        </div>
    );
};

export default SeedThreeWords;
