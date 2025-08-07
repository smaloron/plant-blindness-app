import React from "react";

// For each statement, agree/disagree
const AgreeDisagreeList = ({statements, value = {}, onChange}) => {
    const handleChange = (statement, agree) => {
        onChange({...value, [statement]: agree});
    };

    return (
        <div className="radio-list">
            {statements.map(st => (
                <div key={st}>
                    <p className="likert-group-label">{st}</p>
                    <div className="likert-group">
                        <label className={`likert-label ${value[st] === true ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name={st}
                                checked={value[st] === true}
                                onChange={() => handleChange(st, true)}
                            />
                            <span className="ml-1">D’accord</span>
                        </label>
                        <label className={`likert-label ${value[st] === false ? "" : "selected"}`}>
                            <input
                                type="radio"
                                name={st}
                                checked={value[st] === false}
                                onChange={() => handleChange(st, false)}
                                className="accent-green-600"
                            />
                            <span className="ml-1">Pas d’accord</span>
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default AgreeDisagreeList;
