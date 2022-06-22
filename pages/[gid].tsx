import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import TTCBoard from '../components/TTCBoard'
import { GetServerSideProps, NextPage } from 'next'
import React, { useState, useEffect, FormEvent, } from 'react'
import Sidebar from '../components/Sidebar'
import { socketuri } from '../config'

const socket = io(socketuri)

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
    socket.emit("move", {position: position, player_id: socket.id, game_id: gid})
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

  useEffect(() => {
    socket.emit("join", { game_id: gid})

    socket.on("joined", (data) => {
      if (data.id !== gid) return 
      setTurn(data.turn)
      setBoard(data.board)
    })

    socket.on("start", data => {
      if (data.game_id == gid) {
        setStarted(true)
      }
    })

    socket.on("board_update", data => {
      if (data.game_id !== gid) return 
      setBoard(data.board)
      setTurn(data.turn)
    })

    socket.on("result", data => {
      const {winner, game_id, marks} = data

      if (game_id !== gid) return
      const my_mark =marks[socket.id]
      winner == "draw" ? setWon('draw') : setWon(my_mark == winner)
      socket.emit("destroy", { game_id: gid })
    })

    socket.on("full", () => {
      router.push("/")
    })

    socket.on("message", (data: {game_id: string, message: string, author: string })=> {
      if(data.game_id !== gid) return
      let author: string = data.author == socket.id ? "You" : "Enemy"
      console.log([...messages, {author, message: data.message} as Message])
      setMessages([...messages, {author, message: data.message} as Message])
    })

    return () => {
      console.log(`Closing socket connection : ${socket.id}`)
      socket.close()
    }
  }, [socket])

  return (
    <div className='grid grid-cols-10 p-5 h-screen gap-10'>
      <Sidebar messages={messages} sendMessage={sendMessage} />
      <TTCBoard board={board} addMark={addMark} won={won} started={started} socket={socket} turn={turn} />
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