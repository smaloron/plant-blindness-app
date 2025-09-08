import React, { useEffect, useRef, useState } from "react";
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
import Thanks from "./questions/Thanks.jsx";

import { savePoll } from "../firebase/useFirestore";

// Main components
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
    "consent": Consent
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



export default function PollContainer({ onStepChange }) {
    // questions et états globaux
    const questions = PollConfig();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [docId, setDocId] = useState(null);

    // évite le déclenchement au 1er rendu
    const didMountRef = useRef(false);

    // notifie le parent à chaque changement de question
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }
        if (!isFinished) onStepChange?.();
    }, [step, isFinished, onStepChange]);

    useEffect(() => {
        const createDoc = async () => {
            const ref = await savePoll({ createdAt: Date.now(), answers: {} });
            setDocId(ref.id);
        };
        createDoc();
    }, []);

    // si fini, on ne calcule plus q/QuestionComponent
    const q = isFinished ? null : questions[step];
    const QuestionComponent = isFinished
        ? null
        : questionTypes[q.type];

    const value = isFinished
        ? undefined
        : answers[q.name] ?? getDefaultValue(q);

    // maj d'une réponse
    const handleChange = async (val) => {
        if (isFinished) return;
        const updatedAnswers = { ...answers, [q.name]: val };
        setAnswers(updatedAnswers);

        if (docId) {
            await savePoll(updatedAnswers, docId);
        }
    };

    // navigation
    const handleNext = () =>
        setStep((s) => Math.min(s + 1, questions.length - 1));
    const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

    // validation finale → écran Thanks (pas de numérotation)
    const handleSubmit = async () => {
        setIsFinished(true);
        onStepChange?.(); // optionnel: change aussi le fond ici

        //const ref = await savePoll(answers);
        //console.log(ref);
    };

    const isAnswered = (value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string") return value.trim() !== "";
        if (Array.isArray(value)) {
            if (value.length === 0) return false;

            // Cas des trois mots ["", "", ""]
            if (value.every(v => typeof v === "string")) {
                return value.some(v => v.trim() !== "");
            }

            // Cas Likert [{question, answer: ...}]
            if (value.every(v => typeof v === "object" && "answer" in v)) {
                return value.some(v => v.answer !== undefined);
            }

            return true;
        }
        return true;
    };

    return (
        <main className="main-container">
            <div className="content-box">
                {isFinished ? (
                    // écran final sans numérotation
                    <Thanks />
                ) : (
                    <>
                        <h1 className="question-number">
                            {step + 1} sur {questions.length}
                        </h1>

                        <div className="question-title">{q.question}</div>

                        <QuestionComponent
                            key={step}
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
                                    <button
                                        className="btn primary"
                                        onClick={handleNext}
                                        disabled={!isAnswered(value)}
                                    >
                                        Suivant
                                    </button>
                                ) : (
                                    <button
                                        className="btn primary"
                                        onClick={handleSubmit}
                                        disabled={!isAnswered(value)}
                                    >
                                        Valider
                                    </button>
                                )}
                            </div>

                        <div className="right">
                            {(step === 4 || step === 5 || step === 6 || step === 7) && (
                                <button className="link" onClick={handleNext}>
                                    Passer cette question
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
