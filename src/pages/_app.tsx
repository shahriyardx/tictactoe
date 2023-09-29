import WsProvider from "@/socket/SocketContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WsProvider>
      <Component {...pageProps} />
    </WsProvider>
  );
}
