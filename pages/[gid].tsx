import { GetServerSideProps, NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import XY from '../components/XY'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import TTCBoard from '../components/TTCBoard'

const socket = io("https://secure-gorge-23609.herokuapp.com/")

interface Board<T> {
  [key: string]: T
}

type Props = {gid: string}

const Game: NextPage<Props> = ({ gid }: Props) => {
  const router = useRouter()
  const [won, setWon] = useState<boolean|string|null>(null)
  const [turn, setTurn] = useState<string|null>()
  const [started, setStarted] = useState<boolean>(false)
  const [board, setBoard] = useState<Board<string|null>|null>()

  const addMark = (position: string) => {
    if (board ? board[position] : null) return
    if (turn !== socket.id) return
    socket.emit("move", {position: position, player_id: socket.id, game_id: gid})
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
      console.log(game_id, winner, marks)

      if (game_id !== gid) return
      const my_mark =marks[socket.id]
      if (winner == "draw") {
        setWon('draw')
      } else if (my_mark == winner) {
        setWon(true)
      } else {
        setWon(false)
      }

      socket.emit("destroy", { game_id: gid })
    })

    socket.on("full", () => {
      router.push("/")
    })
  }, [socket])

  return (
    <div className='grid place-items-center p-5 h-screen'>
      <div className='w-full max-w-[500px] text-center'>
        {board && won == null && (
          <TTCBoard board={board} addMark={addMark} />
        )}

        <div className='w-full mt-3'>
          {won === null && (
            <p>
              {
                !started 
                  ? "Waiting for another player"
                  : board 
                    ?  turn == socket.id ? "Your turn" : "Waiting for other players turn"
                    : null
              }
            </p>
          )}
          {won !== null && (
            <div className='flex flex-col gap-5 items-center'>
              <h1 className='text-2xl font-bold '>{won === true ? "You Won" : won === false? "You lost" : "Draw"} </h1>
              <div>
                <button className='px-5 py-2 bg-black text-white' onClick={() => window.location.reload()}>Restart</button>
              </div>
            </div>
          )}
        </div>
      </div>
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