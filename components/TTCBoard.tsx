import React from 'react'
import XY from './XY'

interface Board<T> {
  [key: string]: T
}

type Props = {
  board: Board<string|null>,
  addMark: CallableFunction,
}

const TTCBoard = ({ board, addMark }: Props) => {
  return (
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
  )
}

export default TTCBoard