import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const COOKIE = "PrivacyFirstSocketIdForRecovery";

export const socket = (process.env.NODE_ENV === "development") ? io("localhost:3001", { transports : ['websocket'] }) : io();
socket.on("connect", () => {
  
  var previousID = cookies.get(COOKIE);
  if (previousID && previousID.length > 0) {
    socket.emit("restore player by id", previousID);
  } else {
    cookies.set(COOKIE, socket.id, { path: '/' });
  }
})
socket.on("restore player not possible", () => {
  cookies.set(COOKIE, socket.id, { path: '/' });
})

export const useSubscription = (event: string, listener: Function) => {
    return useEffect(() => {
        socket.on(event, listener);
        return () => {
          socket.off(event);
        };
      }, [event, listener]);
}
