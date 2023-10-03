import { Player } from "@/types/game"
import Image from "next/image"
import React from "react"

type Props = {
  currentTurn: string
  user: Player & { avatar: string }
  oponent: Player & { avatar: string }
}

const GameHeader = ({ currentTurn, user, oponent }: Props) => {
  return (
    <div className="flex items-center justify-between bg-black p-3 rounded-md">
      <div className="grid grid-cols-[35px,auto] sm:grid-cols-[80px,auto] gap-2 sm:gap-5">
        <Image
          src={(user.avatar as string) || "/pfp.png"}
          width={80}
          height={80}
          alt="Avatar"
          className="rounded-md"
        />
        <div className="flex flex-col justify-center">
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

      {oponent.id && (
        <div className="grid grid-cols-[auto,35px] sm:grid-cols-[auto,80px] gap-2 sdm:gap-5">
          <div className="flex flex-col justify-center items-end">
            <span className="sm:text-2xl">{oponent.name}</span>
            <span className="text-xs sm:text-base">
              {currentTurn === oponent.id ? (
                <span className="text-green-500">Turn now</span>
              ) : (
                <span className="text-yellow-500">wait</span>
              )}
            </span>
          </div>
          <Image
            src={(oponent.avatar as string) || "/pfp.png"}
            width={80}
            height={85}
            alt="Avatar"
            className="rounded-md"
          />
        </div>
      )}
    </div>
  )
}

export default GameHeader
