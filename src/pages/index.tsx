import Container from "@/components/Container"
import Header from "@/components/Header"
import { WsContext } from "@/socket/SocketContext"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

const Home = () => {
  const { ws, createWs } = useContext(WsContext)
  const router = useRouter()
  const [username, setUsername] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("name")
    if (name) {
      if (!ws) {
        createWs()
      }
      router.push("/game")
    }
  }, [router, createWs, ws])

  const handleSubmit = () => {
    localStorage.setItem("name", username)
    createWs()
    router.push("/game")
  }

  return (
    <Container>
      <div className="w-full h-screen grid place-items-center">
        <div className="w-full px-5">
          <Header />
          <input
            className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-black text-white rounded-md mt-3 w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </Container>
  )
}

export default Home
