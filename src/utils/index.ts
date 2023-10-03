import { createAvatar as diceCreateAvatar } from "@dicebear/core"
import { funEmoji } from "@dicebear/collection"

export const createAvatar = async (seed: string) => {
  const avatar = diceCreateAvatar(funEmoji, {
    seed,
  })

  const image = await avatar.png().toDataUri()
  return image
}

export const socket: { value: WebSocket | null } = {
  value: null,
}
