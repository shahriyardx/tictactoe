import React, { FormEventHandler } from 'react'
import { motion } from 'framer-motion'

type Message = {
  author: "You" | "Enemy",
  message: string
}

type Props = {
  messages: Message[],
  sendMessage: FormEventHandler
}

const Sidebar = ({ messages, sendMessage }: Props) => {
  return (
    <motion.div className='col-span-2 hidden md:flex flex-col justify-end'>
      <motion.div layout className='flex flex-col gap-1 w-full overflow-hidden mb-3'>
        {messages.map((message, index) => {
          return (
            <motion.p layout key={index} className="block">
              <span className='font-bold'>{message.author}: </span>
              <span>{message.message}</span>
            </motion.p>
          )
        })}
      </motion.div>

      <form onSubmit={sendMessage} className="w-full">
        <input type="text" className='w-full bg-zinc-800' name="message" />
      </form>
    </motion.div>
  )
}

export default Sidebar