// PollContainer.jsx
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

// --- Modal simple (overlay plein écran) -----------------------------
function ThanksModal({ open }) {
    if (!open) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <Thanks />
                <p className="modal-timer">
                    Retour à l'accueil dans quelques secondes…
                </p>
            </div>
        </div>
    );
}
// --------------------------------------------------------------------

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

    // état pour la modale + timer
    const [showThanks, setShowThanks] = useState(false);
    const timeoutRef = useRef(null);

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

    // créer un document vide au démarrage
    useEffect(() => {
        const createDoc = async () => {
            const ref = await savePoll({
                createdAt: Date.now(),
                answers: {}
            });
            setDocId(ref.id);
        };
        createDoc();
        // nettoyer un éventuel timer au démontage
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // si fini, on ne calcule plus q/QuestionComponent
    const q = isFinished ? null : questions[step];
    const QuestionComponent = isFinished ? null : questionTypes[q.type];

    const value = isFinished
        ? undefined
        : answers[q.name] ?? getDefaultValue(q);

    // maj d'une réponse (auto-save à chaque saisie)
    const handleChange = async (val) => {
        if (isFinished) return;
        const updated = { ...answers, [q.name]: val };
        setAnswers(updated);
        if (docId) await savePoll({ answers: updated }, docId);
    };

    // navigation
    const handleNext = () =>
        setStep((s) => Math.min(s + 1, questions.length - 1));
    const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

    // validation finale
    const handleSubmit = async () => {
        // 1) marquer le sondage comme complet AVANT la dernière écriture
        if (docId) await savePoll({ complete: true }, docId);

        // 2) enregistrer la dernière réponse (state déjà à jour)
        if (docId) await savePoll({ answers }, docId);

        // 3) afficher la modale, geler l'UI
        setIsFinished(true);
        setShowThanks(true);

        // 4) attendre 30 s puis retour à l'accueil
        timeoutRef.current = setTimeout(() => {
            setShowThanks(false);
            // reset possible si on veut rester SPA :
            // window.location.reload();  // hard reset
            window.location.assign("/"); // retour à la home
        }, 10000);
    };

    const isAnswered = (val) => {
        if (val === null || val === undefined) return false;
        if (typeof val === "string") return val.trim() !== "";
        if (Array.isArray(val)) {
            if (val.length === 0) return false;
            if (val.every(v => typeof v === "string")) {
                return val.some(v => v.trim() !== "");
            }
            if (val.every(v => typeof v === "object" && "answer" in v)) {
                return val.some(v => v.answer !== undefined);
            }
            return true;
        }
        return true;
    };

    return (
        <main className="main-container">
            <div className="content-box">
                {/* Modale de remerciement au-dessus de tout */}
                <ThanksModal open={showThanks} />

                {isFinished ? (
                    // on ne montre plus la question, seule la modale est visible
                    <div style={{ height: 0 }} aria-hidden="true" />
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
                            {(step >= 6 && step <= 9) && (
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
