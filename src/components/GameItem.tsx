import { WsContext } from "@/socket/SocketContext"
import { Board } from "@/types/game"
import React, { useContext } from "react"

type Props = {
  game: Board
}

const GameItem = ({ game }: Props) => {
  const { ws } = useContext(WsContext)

  const join_game = (game_id: string) => {
    if (ws) {
      const payload = {
        type: "join_game",
        game_id,
      }
      ws.send(JSON.stringify(payload))
    }
  }

  return (
    <div className="flex justify-between shadow-md border border-zinc-400 px-3 py-2 items-center rounded-md">
      <span>{game.players[0]?.name || game.id}</span>
      <button
        onClick={() => join_game(game.id)}
        className="text-lg px-3 py-2 bg-black text-white rounded-md"
      >
        Join
      </button>
    </div>
  )
}

export default GameItem
