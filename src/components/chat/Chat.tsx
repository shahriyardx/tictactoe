import { WsContext } from "@/socket/SocketContext"
import Image from "next/image"
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

type Message = {
  userId: string
  userName: string
  content: string
}

const Chat = () => {
  const [messages, setMessages] = useState<Array<Message>>([])
  const [chatOpen, setChatOpen] = useState(true)
  const { ws } = useContext(WsContext)

  const messagesRef = useRef<HTMLDivElement | null>(null)

  const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const message = form.elements.namedItem("message") as HTMLInputElement

    if (message.value) {
      ws?.send(JSON.stringify({ type: "chat", data: message.value }))
      form.reset()
    }
  }

  const messageHandler = (event: MessageEvent) => {
    const data = JSON.parse(event.data)
    if (!data.success) {
      return alert(data.error_message)
    }

    if (data.type === "chat") {
      setMessages((old) => [...old, data.data])
    }
  }

  useEffect(() => {
    if (ws) {
      ws.addEventListener("message", messageHandler)
    }

    return () => ws?.removeEventListener("message", messageHandler)
  }, [ws])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="absolute bottom-0 left-0 w-full">
      {chatOpen && (
        <div className="p-3 bg-zinc-800 rounded-tl-xl h-[50vh]">
          <div
            ref={messagesRef}
            className="flex flex-col gap-3 overflow-x-hidden overflow-y-scroll h-full pb-20"
          >
            {messages.map((message, index) => (
              <div key={index} className="grid grid-cols-[50px,auto] gap-3">
                <Image
                  width={50}
                  height={50}
                  alt={message.userId}
                  src={`https://api.dicebear.com/7.x/pixel-art/png?seed=${message.userId}`}
                />
                <div>
                  <p className="text-lg font-bold">{message.userName}</p>
                  <p key={index}>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleMessageSubmit}
            className="absolute bottom-0 left-0 w-full p-5"
          >
            <div className="grid grid-cols-[auto,100px]">
              <input
                type="text"
                name="message"
                className="w-full bg-zinc-600 px-5 py-2 rounded-l-xl"
                placeholder="Enter your message here"
              />
              <button className="px-3 py-3 bg-black rounded-r-xl">Send</button>
            </div>
          </form>
        </div>
      )}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="px-3 py-2 absolute top-0 -translate-y-full right-5 bg-zinc-600 rounded-t-xl"
      >
        Chat
      </button>
    </div>
  )
}

export default Chat
