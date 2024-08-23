// Lobby.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3300");

export default function Lobby() {
    const navigate = useNavigate();
    const location = useLocation();
    const [rooms, setRooms] = useState([]);
    const nickname = new URLSearchParams(location.search).get("nickname");

    useEffect(() => {
        socket.emit("join-lobby", { nickname });

        socket.on("update-rooms", (rooms) => {
            setRooms(rooms);
        });

        return () => {
            socket.off("update-rooms");
        };
    }, [nickname]);

    const handleCreateRoom = () => {
        socket.emit("create-room", { nickname });
    };

    const handleJoinRoom = (roomId) => {
        socket.emit("join-room", { roomId, nickname });
        navigate(`/room/${roomId}?nickname=${nickname}`);
    };

    const handleReturnNickname = () => {
        navigate("/");
    };

    return (
        <div className="lobby-container">
            <h1>Lobby</h1>
            <div className="lobby-buttons">
                <button onClick={handleCreateRoom} className="create-room-button">Create Room</button>
                <button onClick={handleReturnNickname} className="return-button">Return to Nickname</button>
            </div>
            <ul className="rooms-list">
                {rooms.map((room) => (
                    <li key={room.id} className="room-item">
                <span className="room-info">
                    {room.name} - Players: {room.players.length}/2
                </span>
                        <button onClick={() => handleJoinRoom(room.id)} className="join-room-button">Join</button>
                    </li>
                ))}
            </ul>
        </div>

    );
}
