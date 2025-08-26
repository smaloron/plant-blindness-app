import React, { useState } from "react";
import PollConfig from "../data/PollConfig.js";
import SingleSeedChoice from "./questions/SingleSeedChoice";
import TextAnswer from "./questions/TextAnswer";
import MultiSeedChoice from "./questions/MultipleSeedChoice";
import ThreeWords from "./questions/ThreeWords";
import SeedThreeWords from "./questions/SeedThreeWords";
import AgreeDisagreeList from "./questions/AgreeDisagreeList";
import LikertGroup from "./questions/LikertGroup";
import FakeSeed from "./questions/FakeSeed";
import RadioGroup from "./questions/RadioGroup";
import Demographics from "./questions/Demographics";
import CheckboxList from "./questions/CheckboxList.jsx";
import Consent from "./questions/Consent.jsx";

import { savePoll } from "../firebase/useFirestore";


// Main component
const questionTypes = {
    "single-seed": SingleSeedChoice,
    "text": TextAnswer,
    "multi-seed": MultiSeedChoice,
    "three-words": ThreeWords,
    "seed-three-words": SeedThreeWords,
    "agree-disagree-list": AgreeDisagreeList,
    "likert-group": LikertGroup,
    "fake-seed": FakeSeed,
    "radio-list": RadioGroup,
    "checkbox-list": CheckboxList,
    "demographics": Demographics,
    "consent": Consent,
};

const initLikert = (items = []) =>
    items.map(q => ({ question: q, answer: undefined }));

const getDefaultValue = (q) => {
    switch (q.type) {
        case "three-words":
            return ["", "", ""];
        case "multi-seed":
            return [];
        case "checkbox-list":
            return [];
        case "single-seed":
        case "fake-seed":
            return null;
        case "likert-group":
            return initLikert(q.items);
        default:
            return "";
    }
};

function PollContainer() {
    const questions = PollConfig();
    const [step, setStep] = useState(0);


    const [answers, setAnswers] = useState({});

    const q = questions[step];
    const QuestionComponent = questionTypes[q.type];

    const value = answers[q.name] ?? getDefaultValue(q);


    const handleChange = (val) => {
        setAnswers(prev => ({
            ...prev,
            [q.name]: val
        }));
    };

    const handleNext = () => setStep(s => Math.min(s + 1, questions.length - 1));
    const handlePrev = () => setStep(s => Math.max(s - 1, 0));

    const handleSubmit = () => {
        alert("Réponses :\n" + JSON.stringify(answers, null, 2));
        //savePoll(answers)
    };

    return (
        <main className="main-container">
            <div className="content-box">
                <h1 className="question-number">{step +1} sur {questions.length}</h1>
                <div className="question-title">
                    {q.question}
                </div>
                <QuestionComponent
                    {...q}
                    value={value}
                    onChange={handleChange}
                />
                <div className="button-row">
                    {step > 0 && (
                        <button className="btn" onClick={handlePrev}>
                            Précédent
                        </button>
                    )}
                    {step < questions.length - 1 ? (
                        <button className="btn primary" onClick={handleNext}>
                            Suivant
                        </button>
                    ) : (
                        <button className="btn primary" onClick={handleSubmit}>
                            Valider
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
export default PollContainer;
