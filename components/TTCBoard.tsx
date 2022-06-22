import React from 'react'
import XY from './XY'

interface Board<T> {
  [key: string]: T
}

type Props = {
  board: Board<string|null> | null,
  addMark: CallableFunction,
  won: string | boolean | null,
  socket: any,
  started: boolean,
  turn: string | null | undefined,
  gid: string,
}

const TTCBoard = ({ board, addMark, won, started, socket, turn, gid }: Props) => {
  return (
    <div className='text-center col-span-10 md:col-span-8 flex justify-center items-center'>
      <div className='w-full'>
        {board && won == null && (
          <div className='w-full max-w-[500px] mx-auto aspect-square'>
            <div className='grid grid-cols-3'>
              <div onClick={() => addMark("one")} className='tcell !border-r-zinc-500 !border-b-zinc-500'>
                {board["one"] && <XY mark={board["one"]} />}
              </div>
              <div onClick={() => addMark("two")} className='tcell !border-r-zinc-500 !border-b-zinc-500'>
                {board["two"] && <XY mark={board["two"]} />}
              </div>
              <div onClick={() => addMark("three")} className='tcell !border-b-zinc-500'>
                {board["three"] && <XY mark={board["three"]} />}
              </div>
            </div>

            <div className='grid grid-cols-3'>
              <div onClick={() => addMark("four")} className='tcell !border-r-zinc-500 !border-b-zinc-500'>
                {board["four"] && <XY mark={board["four"]} />}
              </div>
              <div onClick={() => addMark("five")} className='tcell !border-r-zinc-500 !border-b-zinc-500'>
                {board["five"] && <XY mark={board["five"]} />}
              </div>
              <div onClick={() => addMark("six")} className='tcell !border-b-zinc-500'>
                {board["six"] && <XY mark={board["six"]} />}
              </div>
            </div>

            <div className='grid grid-cols-3'>
              <div onClick={() => addMark("seven")} className='tcell !border-r-zinc-500'>
                {board["seven"] && <XY mark={board["seven"]} />}
              </div>
              <div onClick={() => addMark("eight")} className='tcell !border-r-zinc-500'>
                {board["eight"] && <XY mark={board["eight"]} />}
              </div>
              <div onClick={() => addMark("nine")} className='tcell '>
                {board["nine"] && <XY mark={board["nine"]} />}
              </div>
            </div>
          </div>
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
                <button className='px-5 py-2 bg-black text-white' onClick={() => socket.emit("join", { game_id: gid})}>Restart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TTCBoard