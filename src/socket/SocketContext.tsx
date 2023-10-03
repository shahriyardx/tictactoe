import React, { createContext, useEffect, useState } from "react"

let socket: WebSocket | null = null

export const WsContext = createContext<{
  ws: WebSocket | null
  createWs: () => void
}>({ ws: null, createWs: () => {} })

type Props = {
  children: React.ReactNode
}

const WsProvider = ({ children }: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(socket)

  const createWs = () => {
    if (socket && !ws) {
      setWs(socket)
      return
    }

    if (ws || socket) {
      return
    }

    const prevId = localStorage.getItem("userId")
    const name = localStorage.getItem("name")

    const query = new URLSearchParams()

    if (name) query.append("name", name)
    if (prevId) query.append("prevId", prevId)

    const url = new URL(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}?${query.toString()}`,
    )
    const soc = new WebSocket(url.toString())
    socket = soc

    soc.addEventListener("open", () => {
      setWs(soc)
    })
  }

  useEffect(() => {
    return () => ws?.close()
  }, [ws])

  return (
    <WsContext.Provider value={{ ws, createWs }}>{children}</WsContext.Provider>
  )
}

export default WsProvider
