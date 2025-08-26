import React, { useEffect, useState } from "react";

/* Display one seed (by id) and 3 text inputs.
   - seeds: array of { id, name?, img }
   - seedId: id of the seed to display
   - value (optional): { seedId, words: [w1, w2, w3] }
     -> used only as initial value
   - onChange (optional): receives { id, name , words }
*/
const SeedThreeWords = ({
                            seeds = [],
                            seedId = null,
                            value,
                            onChange,
                        }) => {
    // find the current seed from the provided id
    const seed = seeds.find((s) => s.id === seedId) || null;

    // local state so each instance is independent
    const [words, setWords] = useState(
        () => value?.words?.slice(0, 3) || ["", "", ""]
    );

    // reset words when the seed id changes
    useEffect(() => {
        setWords(value?.words?.slice(0, 3) || ["", "", ""]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seedId]);

    // update one word and notify parent
    const handleWordChange = (i, w) => {
        const next = [...words];
        next[i] = w;
        setWords(next);
        onChange?.({ id: seed.id, name: seed.name, words: next });
    };

    return (
        <div>
            {seed && (
                <div
                    className="seed-item-large"
                    style={{ margin: "0 auto 1rem", maxWidth: 420 }}
                >
                    <img
                        src={seed.img}
                        alt={seed.name || "Graine"}
                        className="seed-img-large"
                        style={{ width: 340 }}
                    />
                </div>
            )}

            <div style={{ display: "flex", gap: "0.7rem" }}>
                {[0, 1, 2].map((i) => (
                    <input
                        key={i}
                        type="text"
                        value={words[i] || ""}
                        onChange={(e) => handleWordChange(i, e.target.value)}
                        placeholder={`Mot ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SeedThreeWords;
