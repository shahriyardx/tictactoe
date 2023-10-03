import { WsContext } from "@/socket/SocketContext"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("")
  const { ws, createWs } = useContext(WsContext)

  const router = useRouter()

  useEffect(() => {
    const name = localStorage.getItem("name")

    if (!name) {
      localStorage.removeItem("name")
      localStorage.removeItem("userId")

      router.push("/")
      return
    }

    createWs()
    setName(name)
  }, [router, createWs])

  if (!name) return null
  if (!ws) return null

  return children
}

export default RequireAuth
