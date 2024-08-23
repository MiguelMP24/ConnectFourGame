import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NicknameInput() {
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (nickname) {
            navigate(`/lobby?nickname=${nickname}`);
        }
    };

    return (
        <div className="nickname-container">
            <h1>Enter your Nickname</h1>
            <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="nickname-input"
                placeholder="Type your nickname..."
            />
            <button onClick={handleSubmit} className="join-button">Join Lobby</button>
        </div>

    );
}
