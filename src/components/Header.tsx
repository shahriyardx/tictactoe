import Image from "next/image"
import React from "react"

const Header = ({ online }: { online: number }) => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image src="/ttt.png" width={300} height={300} alt="banner" />
      </div>
      <div className="flex justify-between items-center mb-5 mt-10">
        <h1 className="text-4xl font-bold text-center">
          Tic Tac Toe
        </h1>
        <span>
          Online: <span className="text-green-500">{online}</span>
        </span>
      </div>
    </div>
  )
}

export default Header
