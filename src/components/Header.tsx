import Image from "next/image"
import React from "react"

const Header = ({
  readyState,
  online,
}: {
  online: number
  readyState: number
}) => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image src="/ttt.png" width={300} height={300} alt="banner" />
      </div>
      <div className="flex justify-between items-center mb-5 mt-10">
        <h1 className="text-4xl font-bold text-center">Tic Tac Toe</h1>
        <span>
          Online:{" "}
          <span className="text-green-500">
            {readyState === 1 ? online : "loading"}
          </span>
        </span>
      </div>
    </div>
  )
}

export default Header
