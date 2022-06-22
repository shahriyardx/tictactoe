import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  game_id: string,
}

const Game = ({ game_id }: Props) => {
  return (
    <motion.div initial={{ x: -50 }} animate={{ x: 0 }} className='px-5 py-2 flex items-center justify-between odd:bg-zinc-800 rounded-md'>
      <span>{game_id}</span>
      <Link href={`/${game_id}`}>
        <a className='px-3 py-1 bg-black text-white'>Join</a>
      </Link>
    </motion.div>
  )
}

export default Game