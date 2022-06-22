import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import TTCBoard from '../components/TTCBoard'
import { GetServerSideProps, NextPage } from 'next'
import React, { useState, useEffect, FormEvent, } from 'react'
import Sidebar from '../components/Sidebar'
import { socketuri } from '../config'

const socket = io(socketuri, { reconnection: true })

interface Board<T> {
  [key: string]: T
}

type Props = {
  gid: string
}

type Message = {
  author: "You" | "Enemy",
  message: string
}

type SocketMessage = {
  game_id: string, 
  message: string, 
  author: string 
}

const Game: NextPage<Props> = ({ gid }: Props) => {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [won, setWon] = useState<boolean|string|null>(null)
  const [turn, setTurn] = useState<string|null>(null)
  const [started, setStarted] = useState<boolean>(false)
  const [board, setBoard] = useState<Board<string|null>|null>(null)

  const addMark = (position: string) => {
    if (board ? board[position] : null) return
    if (turn !== socket.id) return
    socket.emit("move", { position: position, player_id: socket.id, game_id: gid })
  }

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = e.currentTarget.message.value
    socket.emit("message", {
      message,
      author: socket.id,
      game_id: gid
    })

    e.currentTarget.reset()
  }

  const restartGame = () => {
    setWon(null)
    setStarted(false)
    socket.emit("join", { game_id: gid})
  }

  useEffect(() => {
    socket.emit("join", { game_id: gid})

    socket.on("joined", ({id, turn, board }) => {
      if (id !== gid) return

      setTurn(turn)
      setBoard(board)
    })

    socket.on("start", ({ game_id }) => {
      if (game_id == gid) {
        setStarted(true)
      }
    })

    socket.on("board_update", ({ game_id, board, turn }) => {
      if (game_id !== gid) return 
      setBoard(board)
      setTurn(turn)
    })

    socket.on("result", ({winner, game_id, marks}) => {
      if (game_id !== gid) return
      winner == "draw" ? setWon("draw") : setWon(marks[socket.id] == winner)
      socket.emit("destroy", { game_id: gid })
    })

    socket.on("full", () => {
      router.push("/")
    })

    socket.on("abandoned", ({ game_id }) => {
      if (game_id == gid) {
        router.push("/")
      }
    })

    socket.on("message", ({ game_id, author: author_id, message }: SocketMessage)=> {
      if(game_id !== gid) return
      let author = author_id == socket.id ? "You" : "Enemy"
      setMessages((oldMessages) => [...oldMessages, {author, message: message} as Message])
    })

    return () => {
      console.log(`Closing socket connection : ${socket.id}`)
      socket.close()
    }
  }, [gid, router])

  return (
    <div className='grid grid-cols-10 p-5 h-screen gap-10'>
      <Sidebar messages={messages.slice(0, 10)} sendMessage={sendMessage} />
      <TTCBoard board={board} addMark={addMark} won={won} started={started} socket={socket} turn={turn} restartGame={restartGame}/>
    </div>
  )
}

export default Game

export const getServerSideProps: GetServerSideProps  = async ({ query }) => {
  return {
    props: {
      gid: query.gid
    }
  }
}