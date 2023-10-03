import { WsContext } from "@/socket/SocketContext"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { BiX, BiCircle } from "react-icons/bi"
import toast from "react-hot-toast"
import Modal from "@/components/Modal"
import DisconnectedModal from "@/components/DisconnectedModal"
import { Player } from "@/types/game"
import GameHeader from "@/components/GameHeader"
import { createAvatar } from "@/utils"
import Container from "@/components/Container"

const GamePlayer = () => {
  const { ws } = useContext(WsContext)
  const { gid } = useRouter().query
  const [user, setUser] = useState<Player & { avatar: string }>({
    id: "",
    name: "",
    symbol: "",
    avatar: "",
  })

  const [oponent, setOponent] = useState<Player & { avatar: string }>({
    id: "",
    name: "",
    symbol: "",
    avatar: "",
  })

  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [board, setBoard] = useState(new Array(9).fill(""))
  const [currentTurn, setCurrentTurn] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [winner, setWinner] = useState<string | null>("")
  const [disconnected, setDisconnected] = useState(false)

  const turn = (i: number) => {
    if (!started) return toast.error("Game not started yet.")
    if (finished) return toast.error("Game finished")
    if (currentTurn !== user.id) return toast.error("Not your turn")
    if (board[i] !== "") return toast.error("Please select a different slot")

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
    const uid = localStorage.getItem("userId") || ""
    const name = localStorage.getItem("name") || ""
    const main = async () => {
      if (uid) {
        setUser({
          name,
          id: uid,
          symbol: "",
          avatar: await createAvatar(uid),
        })
      }
    }

    main()
  }, [])

  const listener = useCallback(
    async (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (!data.success) {
        return alert(data.error_message)
      }

      const game_data = data.data

      if (data.type === "game_started") {
        setCurrentTurn(game_data.current_turn)
        setStarted(game_data.started)
        const op = game_data.players.find((p: Player) => p.id !== user.id)
        const player = {
          ...op,
          avatar: await createAvatar(op.id),
        }
        setOponent(player)
      }

      if (data.type == "game_update") {
        setBoard(game_data.board)
        setCurrentTurn(game_data.current_turn)
      }

      if (data.type == "game_finished") {
        const game_data = data.data
        setBoard(game_data.board)
        setFinished(true)
        setWinner(game_data.winner)
        setShowModal(true)
      }

      if (data.type == "oponent_disconnected") {
        setDisconnected(true)
      }
    },
    [user],
  )

  useEffect(() => {
    if (ws) {
      ws?.addEventListener("message", listener)
    }

    return () => ws?.removeEventListener("message", listener)
  }, [ws, listener])

  return (
    <Container>
      <div className="py-3">
        <GameHeader currentTurn={currentTurn} user={user} oponent={oponent} />
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 bg-[url(/board.png)] bg-cover">
          {board.map((i, index) => (
            <div
              onClick={() => turn(index)}
              className="w-full aspect-square grid place-items-center"
              key={index}
            >
              {i == "X" ? (
                <BiX className="text-5xl" />
              ) : i == "O" ? (
                <BiCircle className="text-4xl" />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        state={
          winner == user.id
            ? "winner"
            : winner === oponent?.id
            ? "looser"
            : "draw"
        }
      />
      <DisconnectedModal isOpen={disconnected} />
    </Container>
  )
}

export default GamePlayer
