import React, { createContext, useEffect, useState } from "react";

export const WsContext = createContext<WebSocket | null>(null);

type Props = {
  children: React.ReactNode;
};

const WsProvider = ({ children }: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const createWs = () => {
    return new WebSocket("ws://localhost:3001");
  };

  useEffect(() => {
    const server = createWs();
    setWs(server);

    if (server) {
      server.addEventListener("open", (event) => {
        console.log(event);
      });

      server.addEventListener("message", (event) => {
        console.log(event.data);
      });

      server.addEventListener("close", () => {
        setTimeout(() => {
          createWs();
        }, 3000);
      });
    }
    return () => server.close();
  }, []);

  return <WsContext.Provider value={ws}>{children}</WsContext.Provider>;
};

export default WsProvider;
