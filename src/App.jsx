import './App.css'
import PollContainer from "./components/PollContainer.jsx";


function App() {
    return (
        <div className="app-grid">
            <header>
                Sondage - Exposition graines
            </header>
            <main className="main-container">
                <div className="content-box">
                    <PollContainer className="main-container"/>
                </div>
            </main>
        </div>
    );
}


export default App
