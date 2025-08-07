import React from "react";

const SeedThreeWords = ({ seeds, value = { seedId: null, words: ["", "", ""] }, onChange }) => {
    const handleSeedSelect = (seedId) => {
        onChange({ ...value, seedId });
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {seeds.map(seed => (
                        <button
                            key={seed.id}
                            type="button"
                            className={`border rounded-2xl p-2 flex flex-col items-center shadow
                transition bg-white hover:bg-green-50
                ${value.seedId === seed.id ? "ring-2 ring-green-500" : ""}`}
                            onClick={() => handleSeedSelect(seed.id)}
                        >
                            <img src={seed.img} alt={seed.name} className="h-20 w-auto mb-2 rounded-xl object-cover" />
                            <span className="text-green-700 font-semibold">{seed.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            {value.seedId &&
                <div className="flex gap-2">
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
