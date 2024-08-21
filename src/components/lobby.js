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
            <button onClick={handleCreateRoom}>Create Room</button>
            <button onClick={handleReturnNickname}>Return to Nickname</button>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        {room.name} - Players: {room.players.length}/2
                        <button onClick={() => handleJoinRoom(room.id)}>Join</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
