import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'universal-cookie';

export const socket = (process.env.NODE_ENV === "development") ? io("localhost:3001", { transports : ['websocket'] }) : io();
socket.on("connect", () => {
  console.log("connected");

  const cookies = new Cookies();
  var id = cookies.get('PrivacyFirstSocketIdForRecovery');
  if (id && id.length > 0) {
    socket.emit("restore by id", id);
  } else {
    cookies.set('PrivacyFirstSocketIdForRecovery', socket.id, { path: '/' });
  }
})

export const useSubscription = (event: string, listener: Function) => {
    return useEffect(() => {
        socket.on(event, listener);
        return () => {
          socket.off(event);
        };
      }, [event, listener]);
}
