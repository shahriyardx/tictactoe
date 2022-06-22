import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  game_id: string,
}

const Game = ({ game_id }: Props) => {
  return (
    <div className='px-5 py-3 flex items-center justify-between odd:bg-zinc-200 rounded-md'>
      <span>{game_id}</span>
      <Link href={`/${game_id}`}>
        <a className='px-3 py-2 bg-black text-white'>Join</a>
      </Link>
    </div>
  )
}

export default Game