import { Player } from "@/types/game"
import Image from "next/image"
import React from "react"

type Props = {
  currentTurn: string
  user: Player & { avatar: string }
  oponent: Player & { avatar: string }
}

type ProfileProps = Omit<Props, "oponent"> & {
  reverse?: boolean
}

const Profile = ({ user, reverse, currentTurn }: ProfileProps) => {
  return (
    <div
      className={`grid ${
        reverse
          ? "grid-cols-[auto,35px] sm:grid-cols-[auto,80px]"
          : "grid-cols-[35px,auto] sm:grid-cols-[80px,auto]"
      } gap-2 sm:gap-5`}
    >
      <Image
        src={(user.avatar as string) || "/pfp.png"}
        width={80}
        height={80}
        alt="Avatar"
        className={`rounded-md ${reverse ? "order-2" : ""}`}
      />
      <div
        className={`flex flex-col justify-center ${reverse ? "items-end" : ""}`}
      >
        <span className="sm:text-2xl">{user.name}</span>
        <span className="text-xs sm:text-base">
          {currentTurn === user.id ? (
            <span className="text-green-500">Turn now</span>
          ) : (
            <span className="text-yellow-500">wait</span>
          )}
        </span>
      </div>
    </div>
  )
}

const GameHeader = ({ currentTurn, user, oponent }: Props) => {
  return (
    <div className="flex items-center justify-between bg-black p-3 rounded-md">
      <Profile user={user} currentTurn={currentTurn} />
      <Profile user={oponent} currentTurn={currentTurn} reverse />
    </div>
  )
}

export default GameHeader
