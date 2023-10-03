import { useContext, useEffect, useState } from "react"
import { WsContext } from "@/socket/SocketContext"
import GameItem from "@/components/GameItem"
import { Board } from "@/types/game"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import Container from "@/components/Container"

export default function Game() {
  const { ws, createWs } = useContext(WsContext)

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

      const game_data = data.data

      if (data.type === "connection") {
        localStorage.setItem("userId", game_data.user_id)
      }

      if (data.type === "games") {
        const games = game_data as Array<Board>
        setGames(games)
      }

      if (data.type == "game_joined") {
        router.push(`/game/${game_data}`)
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
    } else {
      createWs()
    }
  }, [ws, createWs])

  useEffect(() => {
    const name = localStorage.getItem("name")
    if (!name) {
      router.push("/")
    }
  }, [router])

  return (
    <Container>
      <div className="mt-10">
        <Header />

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
    </Container>
  )
}
