import React from "react";

type Props = {
  game_id: string;
};

const GameItem = ({ game_id }: Props) => {
  return (
    <div className="flex justify-between shadow-md border border-zinc-400 px-3 py-2 items-center rounded-md">
      <span>{game_id}</span>
      <button className="text-lg px-3 py-2 bg-black text-white rounded-md">
        Join
      </button>
    </div>
  );
};

export default GameItem;
