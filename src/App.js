import { Routes, Route } from 'react-router-dom';
import NicknameInput from "./components/NicknameInput";
import GameRoom from "./components/GameRoom";
import Lobby from "./components/lobby";

function App() {
    return (
            <Routes>
                <Route path="/" element={<NicknameInput />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/room/:roomId" element={<GameRoom />} />
            </Routes>
    );
}

export default App;
