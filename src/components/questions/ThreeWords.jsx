const ThreeWords = ({ value = ["", "", ""], onChange }) => (
    <div className="flex gap-2">
        {[0,1,2].map(i => (
            <input
                key={i}
                type="text"
                className="border rounded-lg p-2 flex-1 focus:ring-green-400"
                value={value[i]}
                onChange={e => {
                    const newVal = [...value];
                    newVal[i] = e.target.value;
                    onChange(newVal);
                }}
                placeholder={`Mot ${i+1}`}
            />
        ))}
    </div>
);
export default ThreeWords;
