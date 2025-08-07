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
    "demographics": Demographics,
    "consent": Consent,
};

const PollContainer = () => {
    const questions = PollConfig();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleChange = (val) => {
        setAnswers(prev => ({ ...prev, [name]: val }));
        //setAnswers({ ...answers, [step]: val });
    };

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleSubmit = async () => {
        await savePoll(answers);
        // TODO: show thank you or redirect
    };

    const q = questions[step];
    const QuestionComponent = questionTypes[q.type];

    return (
        <div>
            <h2 className="question-title">{q.question}</h2>
            <QuestionComponent
                {...q}
                value={answers[q.name] || ""}
                onChange={val => handleChange(q.name, val)}
                //value={answers[step]}
                //onChange={handleChange}
            />
            <div className="button-row">
                {step > 0 &&
                    <button
                        className="btn primary"
                        onClick={handlePrev}
                    >Précédent</button>
                }
                {step < questions.length - 1 ?
                    <button
                        className="btn"
                        onClick={handleNext}
                        disabled={typeof answers[step] === "undefined" || answers[step] === ""}
                    >Suivant</button>
                    :
                    <button
                        className="btn"
                        onClick={handleSubmit}
                    >Valider</button>
                }
            </div>
        </div>
    );
};
export default PollContainer;
