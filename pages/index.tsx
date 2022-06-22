import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { MouseEvent, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import Game from '../components/Game'

const socket = io("https://secure-gorge-23609.herokuapp.com")

const Home: NextPage = () => {
  const [games, setGames] = useState([])
  const router = useRouter()
  const startGame = (event: MouseEvent<HTMLButtonElement>)=> {
    event.preventDefault()
    const game_id = Math.floor(Math.random() * 10000000000)
    router.push(`/${game_id}`)
  }

  useEffect(() => {
    socket.emit("list", {})
    socket.on("games", (data) => {
      setGames(data.games)
    })
  }, [socket])

  return (
    <div className='mt-10 w-full max-w-[400px] mx-auto'>
      <div className='mt-10'>
        <h1 className='text-5xl font-bold text-center'>TIC TAC TOE</h1>
      </div>
      <div className='mt-10'>
        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <div className='mt-5'>
            <button
              onClick={startGame}
              type="button" 
              className='px-5 py-3 bg-black text-white w-full' 
            >
              Start Game
            </button>
          </div>
        </form>
      </div>

      <div className='mt-5 flex flex-col gap-2'>
        {games.map(game => {
          return <Game game_id={game} key={game} />
        })}
      </div>
    </div>
  )
}

export default Home
