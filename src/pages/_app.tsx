import WsProvider from "@/socket/SocketContext"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WsProvider>
      <Toaster />
      <Head>
        <title>Tic Tac Toe</title>
        <meta
          name="description"
          content="A online multiplayer tic-tac-toe game"
        />
        <meta name="Author" content="shahriyardx" />
      </Head>
      <Component {...pageProps} />
    </WsProvider>
  )
}
