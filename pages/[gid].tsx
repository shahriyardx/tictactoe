import { NextPage } from 'next'
import React, { useState } from 'react'
import XY from '../components/XY'

type Props = {}
interface Marks<T> {
  [key: string]: T
}
interface Board<T> {
  [key: string]: T
}

const Game: NextPage = (props: Props) => {
  const marks: Marks<string> = {
    x: "o",
    o: "x"
  }
  const [mark, setMark] = useState<string>("x")
  const [board, setBoard] = useState<Board<string|null>>({
    one: null,
    two: null,
    three: null, 
    four: null,
    five: null,
    six: null,
    seven: null,
    eight: null,
    nine: null,
  })

  const addMark = (position: string) => {
    if (board[position]) return
    const newBoard = {...board}
    newBoard[position] = mark
    setBoard(newBoard)
    setMark(marks[mark])
  }

  return (
    <div className='grid place-items-center p-5 h-screen'>
      <div className='w-full max-w-[500px] aspect-square bg-zinc-200'>
        <div className='grid grid-cols-3'>
          <div onClick={() => addMark("one")} className='tcell border-r-black border-b-black'>
            {board["one"] && <XY mark={board["one"]} />}
          </div>
          <div onClick={() => addMark("two")} className='tcell border-r-black border-b-black'>
            {board["two"] && <XY mark={board["two"]} />}
          </div>
          <div onClick={() => addMark("three")} className='tcell border-b-black'>
            {board["three"] && <XY mark={board["three"]} />}
          </div>
        </div>

        <div className='grid grid-cols-3'>
          <div onClick={() => addMark("four")} className='tcell border-r-black border-b-black'>
            {board["four"] && <XY mark={board["four"]} />}
          </div>
          <div onClick={() => addMark("five")} className='tcell border-r-black border-b-black'>
            {board["five"] && <XY mark={board["five"]} />}
          </div>
          <div onClick={() => addMark("six")} className='tcell border-b-black'>
            {board["six"] && <XY mark={board["six"]} />}
          </div>
        </div>

        <div className='grid grid-cols-3'>
          <div onClick={() => addMark("seven")} className='tcell border-r-black'>
            {board["seven"] && <XY mark={board["seven"]} />}
          </div>
          <div onClick={() => addMark("eight")} className='tcell border-r-black'>
            {board["eight"] && <XY mark={board["eight"]} />}
          </div>
          <div onClick={() => addMark("nine")} className='tcell '>
            {board["nine"] && <XY mark={board["nine"]} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game