import './App.css'
import PollContainer from "./components/PollContainer.jsx";
import Home from "./components/Home.jsx";


function App() {
    return (
        <div className="app-grid">
            <header>
                Sondage - Exposition graines
            </header>
            <main className="main-container">
                <div className="content-box">
                    <Home/>
                </div>
            </main>
        </div>
    );
}


export default App
