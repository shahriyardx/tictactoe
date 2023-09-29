import { WsContext } from "@/socket/SocketContext"
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { BiLoaderAlt } from "react-icons/bi"

const GamePlayer = () => {
  const ws = useContext(WsContext)
  const { gid } = useRouter().query
  const [uid, setUid] = useState("")
  const [started, setStarted] = useState(false)
  const [board, setBoard] = useState(new Array(9).fill(""))
  const [currentTurn, setCurrentTurn] = useState("")

  const turn = (i: number) => {
    if (currentTurn !== uid) {
      return alert("Not your turn")
    }
    if (board[i] !== "") return alert("Please select a different slot")

    const payload = {
      type: "move",
      index: i,
      game_id: gid,
    }
    if (ws) {
      ws.send(JSON.stringify(payload))
    }
  }

  useEffect(() => {
    const uid = localStorage.getItem("user_id")
    if (uid) {
      setUid(uid)
    }
  }, [])

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (!data.success) {
        return alert(data.error_message)
      }

      if (data.type === "game_started") {
        const game_data = data.data
        setCurrentTurn(game_data.current_turn)
        setStarted(game_data.started)
      }

      if (data.type == "game_update") {
        setBoard(data.data.board)
        setCurrentTurn(data.data.current_turn)
      }
    }
    ws?.addEventListener("message", listener)
  }, [ws])
  return (
    <main className="max-w-[400px] mx-auto px-5">
      <div className="py-3">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold">
          {!started ? (
            <>
              <BiLoaderAlt className="animate-spin" />
              <span>Waiting...</span>
            </>
          ) : (
            <span
              className={`${
                currentTurn == uid ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {currentTurn == uid ? "Your turn" : "Other player's turn"}
            </span>
          )}
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3">
          {board.map((i, index) => (
            <div
              onClick={() => turn(index)}
              className="border w-full aspect-square border-black"
              key={index}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default GamePlayer
