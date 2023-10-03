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
      <div className="grid grid-cols-[35px,auto] gap-2">
        <Image
          src={user.avatar as string}
          width={35}
          height={35}
          alt="Avatar"
          className="rounded-md"
        />
        <div className="flex flex-col justify-center">
          <span>{user.name}</span>
          <span className="text-xs">
            {currentTurn === user.id ? (
              <span className="text-green-500">Turn now</span>
            ) : (
              <span className="text-yellow-500">wait</span>
            )}
          </span>
        </div>
      </div>

      {oponent.id && (
        <div className="grid grid-cols-[auto,35px] gap-2">
          <div className="flex flex-col justify-center items-end">
            <span>{oponent.name}</span>
            <span className="text-xs">
              {currentTurn === oponent.id ? (
                <span className="text-green-500">Turn now</span>
              ) : (
                <span className="text-yellow-500">wait</span>
              )}
            </span>
          </div>
          <Image
            src={oponent.avatar as string}
            width={35}
            height={35}
            alt="Avatar"
            className="rounded-md"
          />
        </div>
      )}
    </div>
  )
}

export default GameHeader
