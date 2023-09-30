import { useContext, useEffect, useState } from "react"
import { WsContext } from "@/socket/SocketContext"
import GameItem from "@/components/GameItem"
import { Board } from "@/types/game"
import { useRouter } from "next/router"
import Image from "next/image"

export default function Home() {
  const ws = useContext(WsContext)
  const router = useRouter()
  const [games, setGames] = useState<Board[]>([])

  const create_game = () => {
    if (ws) {
      const payload = {
        type: "create_game",
      }
      ws.send(JSON.stringify(payload))
    }
  }

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (!data.success) {
        return alert(data.error_message)
      }

      if (data.type === "connection") {
        localStorage.setItem("user_id", data.data.user_id)
      }
      if (data.type === "games") {
        const games = data.data as Array<Board>
        setGames(games)
      }

      if (data.type == "game_joined") {
        const game_id = data.data.game_id
        router.push(`/game/${game_id}`)
      }
    }
    ws?.addEventListener("message", listener)

    return () => {
      ws?.removeEventListener("message", listener)
    }
  }, [ws, router])

  useEffect(() => {
    if (ws && ws.readyState === 1) {
      ws?.send(JSON.stringify({ type: "load_games" }))
    }
  }, [ws])

  return (
    <main className="px-5">
      <div className="mt-10">
        <div className="mt-5 max-w-[400px] mx-auto">
          <div className="flex justify-center items-center">
            <Image src="/banner.png" width={200} height={200} alt="banner" />
          </div>
          <h1 className="text-4xl font-bold text-center mb-5 mt-10">Tic Tac Toe</h1>

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
  )
}
