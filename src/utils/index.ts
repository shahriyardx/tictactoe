import { createAvatar as diceCreateAvatar } from "@dicebear/core"
import { pixelArt } from "@dicebear/collection"

export const createAvatar = async (seed: string) => {
  const avatar = diceCreateAvatar(pixelArt, {
    seed,
  })

  const image = await avatar.png().toDataUri()
  return image
}
