import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

const Home: NextPage = () => {
  const router = useRouter()
  const startGame = (event: MouseEvent<HTMLButtonElement>)=> {
    event.preventDefault()
    const game_id = Math.floor(Math.random() * 10000000000)
    router.push(`/${game_id}`)
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div>
        <div className='mt-10'>
          <h1 className='text-5xl font-bold text-center'>TIC TAC TOE</h1>
        </div>
        <div className='mt-10 max-w-xs mx-auto'>
          <form onSubmit={(e) => e.preventDefault()}>
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
      </div>
    </div>
  )
}

export default Home
