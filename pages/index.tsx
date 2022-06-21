import type { NextPage } from 'next'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'

type formValues = {
  game_type: "public" | "private"
}

const Home: NextPage = () => {
  const {register, handleSubmit}  = useForm<formValues>()

  const startGame: SubmitHandler<formValues> = (data) => {
    console.log(data)
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div>
        <div className='mt-10'>
          <h1 className='text-5xl font-bold text-center'>TIC TAC TOE</h1>
        </div>
        <div className='mt-10 max-w-xs mx-auto'>
          <form onSubmit={handleSubmit(startGame)}>
            <div className='flex flex-col gap-2'>
              <label htmlFor="game_type">
                Game Type
              </label>
              <select id="game_type" {...register("game_type")}>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className='mt-5'>
              <button type="submit" className='px-5 py-3 bg-black text-white w-full' >Start Game</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
