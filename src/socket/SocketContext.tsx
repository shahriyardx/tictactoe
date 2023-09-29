import React, { createContext, useEffect, useState } from "react"

export const WsContext = createContext<WebSocket | null>(null)

type Props = {
  children: React.ReactNode
}

const WsProvider = ({ children }: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null)

  const createWs = () => {
    const prevId = localStorage.getItem("user_id")
    const query = new URLSearchParams()
    
    if (prevId) {
      query.append("prevId", prevId)
    }
    const url = new URL(`${process.env.NEXT_PUBLIC_SOCKET_URL}?${query.toString()}`)

    return new WebSocket(url.toString())
  }

  useEffect(() => {
    const server = createWs()
    setWs(server)
    return () => server.close()
  }, [])

  return <WsContext.Provider value={ws}>{children}</WsContext.Provider>
}

export default WsProvider
