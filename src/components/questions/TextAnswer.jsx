const TextAnswer = ({ value, onChange, question }) => (
    <div>
    <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={question}
    />
    </div>
);
export default TextAnswer;
