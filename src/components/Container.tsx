import React from "react"

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`w-full sm:max-w-[640px] mx-auto px-5 ${className}`}>
      {children}
    </div>
  )
}

export default Container
