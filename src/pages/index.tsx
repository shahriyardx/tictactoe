import Image from "next/image";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { WsContext } from "@/socket/SocketContext";
import GameItem from "@/components/GameItem";
import { Board } from "@/types/game";

export default function Home() {
  const ws = useContext(WsContext);
  const [games, setGames] = useState<Board[]>([]);

  const create_game = () => {
    if (ws) {
      const payload = {
        type: "create_game",
      };
      ws.send(JSON.stringify(payload));
    }
  };
  useEffect(() => {
    ws?.addEventListener("message", (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "games") {
        const games = data.data as Array<Board>
        console.log(games)
        setGames(games);
      }
    });
  }, [ws]);
  return (
    <main className="px-5">
      <div className="mt-10">
        <h1 className="text-4xl font-bold text-center">Tic Tac Toe</h1>

        <div className="mt-5 max-w-[400px] mx-auto">
          <button
            onClick={() => create_game()}
            className="text-lg bg-black text-white text-center px-3 py-3 rounded-md w-full"
          >
            New Game
          </button>

          <div className="mt-10 flex flex-col gap-2">
            {games.map((board) => (
              <GameItem key={board.id} game_id={board.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
