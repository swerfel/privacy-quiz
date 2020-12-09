import React, { useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const socket = io("localhost:3001", { transports : ['websocket'] });
socket.on("connect", () => console.log("connected"))
export const SocketsContext = React.createContext(socket);

export const useSubscription = (event: string, listener: Function) => {
    return useEffect(() => {
        socket.on(event, listener);
        return () => {
          socket.off(event);
        };
      }, []);
}
