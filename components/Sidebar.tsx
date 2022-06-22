import React, { FormEventHandler } from 'react'

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
    <div className='col-span-2 hidden md:flex flex-col justify-end'>
      <div className='flex flex-col gap-1 w-full overflow-hidden'>
        {messages.map((message, index) => {
          return (
            <p key={index}>
              <span className='font-bold'>{message.author}: </span>
              <span>{message.message}</span>
            </p>
          )
        })}
      </div>

      <form onSubmit={sendMessage} className="w-full">
        <input type="text" className='w-full bg-zinc-800' name="message" />
      </form>
    </div>
  )
}

export default Sidebar