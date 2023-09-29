import WsProvider from "@/socket/SocketContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WsProvider>
      <Toaster />
      <Component {...pageProps} />
    </WsProvider>
  );
}
