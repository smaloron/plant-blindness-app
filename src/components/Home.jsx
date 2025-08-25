import React, { useState } from "react";
import PollContainer from "./PollContainer";

export default function Home({ numQuestions = 10, durationMin = 5 }) {
    // state : home or poll
    const [showPoll, setShowPoll] = useState(false);

    return (
        <div className="app-grid">
            {/* header */}
            <header style={{ display: "flex", justifyContent: "space-between",
                alignItems: "center" }}>
                <span>PILULE VERTE</span>

                {/* only visible when poll is active */}
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

            {/* main content */}
            <main className="main-container">
                {!showPoll ? (
                    /* home screen */
                    <section className="content-box">
                        {/* UNINE logo */}
                        <div style={{ textAlign: "center" }}>
                            <img
                                src="https://www.unine.ch/communication/wp-content/uploads/sites/70/Logo-noir_700.jpg"
                                alt="Université de Neuchâtel"
                                style={{ width: "260px", maxWidth: "80%" }}
                            />
                        </div>

                        {/* intro */}
                        <div>
                            <p className="question-title">
                                Les gens font-ils attention aux plantes ?
                            </p>
                            <p>
                                Comment les regardent-ils ? À quoi pensent-ils quand ils
                                les voient ?
                            </p>
                        </div>

                        {/* poll invite */}
                        <div>
                            <p
                                style={{
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    marginBottom: "0.6rem",
                                    color: "var(--green-accent)",
                                }}
                            >
                                Participez à notre sondage sur les graines de l'exposition
                                <em> Pilule Verte</em>
                            </p>
                            <p style={{ fontSize: "0.95rem" }}>
                                et aidez-nous à mieux comprendre nos relations avec les
                                plantes.
                            </p>
                        </div>

                        {/* details */}
                        <div>
                            <p style={{ lineHeight: 1.5 }}>
                                Le sondage comprend{" "}
                                <strong>{numQuestions} questions</strong> et vous prendra{" "}
                                <strong>{durationMin} minutes</strong>. Les données sont
                                analysées de façon anonyme par l'Université de Neuchâtel.
                                <br />
                                <span style={{ fontWeight: 600 }}>
                  Merci beaucoup de votre aide&nbsp;!
                </span>
                            </p>
                        </div>

                        {/* call to action */}
                        <div className="button-row" style={{ justifyContent: "center" }}>
                            <button
                                className="btn primary"
                                onClick={() => setShowPoll(true)}
                            >
                                Accéder au sondage
                            </button>
                        </div>
                    </section>
                ) : (
                    /* Poll component */
                    <PollContainer />
                )}
            </main>
        </div>
    );
}
