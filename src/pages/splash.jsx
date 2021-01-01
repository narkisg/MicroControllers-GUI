import React, {useEffect} from "react";
import './splash.scss'
import * as io from "socket.io-client";
import {useHistory} from "react-router-dom";


var socket;
export default function Splash() {
    const history = useHistory();

    useEffect(() => {
        socket = io("http://localhost:5000");
        return () => {
            socket.disconnect()
        }
    }, []);

    useEffect(() => {
        socket.on("is_connected_response", (reply) => {
            // if (reply.success === "false") {
            history.push("/SignInPage");
            // }
        });
        socket.emit("is_connected");
        return (() => socket.off("is_connected_response"))
    }, []);

    return (
        <div>
            <div className="loader">Loading...</div>
        </div>

    )
}

