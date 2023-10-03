import Container from "@/components/Container"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const Home = () => {
  const router = useRouter()
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (localStorage.getItem("name")) router.push("/game")
  }, [router])

  const handleSubmit = () => {
    localStorage.setItem("name", username)

    router.push("/game")
  }

  return (
    <Container>
      <div className="w-full h-screen grid place-items-center">
        <div className="w-full px-5">
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
