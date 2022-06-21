import Image from 'next/image'
import React from 'react'

type Props = {
  mark: string
}

const XY = ({mark}: Props) => {
  return (
    <Image src={mark == "x" ? "/x.png" : "/o.png"} width={50} height={50} layout="responsive" alt='xy' />
  )
}

export default XY