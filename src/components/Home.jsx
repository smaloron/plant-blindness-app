import React, { useEffect, useRef, useState } from "react";
import PollContainer from "./PollContainer";

const baseUrl = import.meta.env.BASE_URL;

export default function Home({
                                 numQuestions = 10,
                                 durationMin = 5,
                                 onViewChange, // ← callback parent
                             }) {
    // état : accueil vs sondage
    const [showPoll, setShowPoll] = useState(false);

    // ne pas déclencher au tout premier rendu
    const didMountRef = useRef(false);
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }
        // à chaque changement d'écran, on demande un nouveau fond
        onViewChange?.();
    }, [showPoll, onViewChange]);

    return (
        <div className="app-grid">
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <span>PILULE VERTE</span>
                {showPoll && (
                    <button
                        className="btn"
                        style={{ fontSize: "0.9rem", padding: "0.4rem 1rem" }}
                        onClick={() => setShowPoll(false)}
                    >
                        Home
                    </button>
                )}
            </header>

            <main className="main-container">
                {!showPoll ? (
                    <section className="content-box">
                        <div className="center">
                            <p className="question-title">
                                Les gens font-ils attention aux plantes ?
                            </p>
                            <p>
                                Comment les regardent-ils ? À quoi pensent-ils quand
                                ils les voient ?
                            </p>
                        </div>

                        <div className="center">
                            <p
                                style={{
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    marginBottom: "0.6rem",
                                    color: "var(--green-accent)",
                                }}
                            >
                                Participez à notre sondage sur les graines de
                                l'exposition <em> Pilule Verte</em> de Séverine Cadier
                            </p>
                            <p style={{ fontSize: "0.95rem" }}>
                                et aidez-nous à mieux comprendre nos relations avec
                                les plantes.
                            </p>
                        </div>

                        <div className="center">
                            <p style={{ lineHeight: 1.5 }}>
                                Le sondage comprend{" "}
                                <strong>{numQuestions} questions</strong> et vous
                                prendra <strong>{durationMin} minutes</strong>. Les
                                données sont analysées de façon anonyme par
                                l'Université de Neuchâtel.
                                <br />
                                <span style={{ fontWeight: 600 }}>
                  Merci beaucoup de votre aide&nbsp;!
                </span>
                            </p>
                        </div>

                        <div className="button-row" style={{ justifyContent:"center" }}>
                            <button
                                className="btn primary"
                                onClick={() => setShowPoll(true)}
                            >
                                Accéder au sondage
                            </button>
                        </div>

                        <div className="logo-strip" aria-label="Partenaires">
                            <img
                                src={baseUrl + "/images/logos/logo-avignon-musees.png"}
                                alt="Avignon Musées"
                            />
                            <img
                                src={
                                    baseUrl +
                                    "/images/logos/logo-terre-culture-couleur-seul.png"
                                }
                                alt="Terre de Culture"
                            />
                            <img
                                src={baseUrl + "/images/logos/logo-unine-noir_700.jpg"}
                                alt="Université de Neuchâtel"
                            />
                        </div>
                    </section>
                ) : (
                    <PollContainer onStepChange={onViewChange}/>
                )}
            </main>
        </div>
    );
}
