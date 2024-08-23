// GameRoom.js
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import ConnectFourBoard from "./ConnectFourBoard";

const socket = io.connect("http://localhost:3300");

export default function GameRoom() {
    const { roomId } = useParams();
    const location = useLocation();
    const nickname = new URLSearchParams(location.search).get("nickname");
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [spectators, setSpectators] = useState([]);

    useEffect(() => {
        socket.emit("join-room", { roomId, nickname });

        socket.on("update-room", (room) => {
            setPlayers(room.players);
            setSpectators(room.spectators);
        });

        return () => {
            socket.off("update-room");
        };
    }, [roomId, nickname]);

    const handleLeaveRoom = () => {
        socket.emit("leave-room", { roomId, nickname });
        navigate("/lobby");
    };

    const handleReturnNickname = () => {
        navigate("/");
    };

    return (
        <div className="game-room-container">
            <h1>Game Room: {roomId}</h1>

            <div className="players-spectators-container">
                <div className="players-container">
                    <h2>Players</h2>
                    <ul>
                        {players.map((player, index) => (
                            <li key={index} className="player-item">{player}</li>
                        ))}
                    </ul>
                </div>

                <div className="spectators-container">
                    <h2>Spectators</h2>
                    <ul>
                        {spectators.map((spectator, index) => (
                            <li key={index} className="spectator-item">{spectator}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <ConnectFourBoard players={players} spectators={spectators}/>

            <div className="buttons-container">
                <button onClick={handleLeaveRoom} className="action-button">Leave Room</button>
                <button onClick={handleReturnNickname} className="action-button">Return to Nickname</button>
            </div>
        </div>

    );
}
