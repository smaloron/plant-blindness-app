import './App.css'
import React, { useCallback, useMemo, useState } from "react";
import Home from "./components/Home.jsx";
import PollConfig from "./data/PollConfig.js";

/* Load all background images from assets/backgrounds */
const bgMap = import.meta.glob(
    "./assets/backgrounds/*.{jpg,jpeg,png,webp,JPG}",
    { eager: true, as: "url" }
);
const bgUrls = Object.values(bgMap);

export default function App() {
    // Pick a random background on first render
    const [bgIndex, setBgIndex] = useState(() =>
        Math.floor(Math.random() * (bgUrls.length || 1))
    );

    // Ask for a new background when a child view changes
    const requestNewBackground = useCallback(() => {
        setBgIndex((i) => {
            const n = bgUrls.length;
            if (n <= 1) return i;
            let j = Math.floor(Math.random() * n);
            return j === i ? (j + 1) % n : j;
        });
    }, []);

    // Resolve current background URL
    const bgUrl = bgUrls[bgIndex];

    // Inline style for the page background
    const bgStyle = useMemo(
        () => ({
            backgroundImage:
                bgUrl
                    ? `linear-gradient(rgba(246,251,246,0.35),
                             rgba(246,251,246,0.55)),
             url("${bgUrl}")`
                    : `linear-gradient(rgba(246,251,246,0.35),
                             rgba(246,251,246,0.55))`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
        }),
        [bgUrl]
    );

    // Get questions to show count on Home
    const questions = PollConfig();

    return (
        <div className="app-grid" style={bgStyle}>
            <main className="main-container">
                <div className="content-box bg">
                    <Home
                        numQuestions={questions.length}
                        onViewChange={requestNewBackground}
                    />
                </div>
            </main>
        </div>
    );
}

