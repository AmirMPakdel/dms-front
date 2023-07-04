import { ChestComponent } from "@/libs/utils/chest";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#2b5797"/>
      <meta name="theme-color" content="#ffffff"/>
  
      <link rel="stylesheet" href="/statics/styles/global.css"/>
      <link rel="stylesheet" href="/statics/styles/colors.css"/>
      <link rel="stylesheet" href="/statics/styles/fonts.css"/>
      <link rel="stylesheet" href="/statics/styles/forced.css"/>
      <link rel="stylesheet" href="/statics/styles/shadows.css"/>
      <link rel="stylesheet" href="/statics/styles/animate.min.css"/>
  
      <script src="/statics/js/theme.js"/>
      <script src="/statics/js/consts.js"/>
      <script src="/statics/js/helpContent.js"/>
      <script src="/statics/js/env.js"/>
      <script src="/statics/js/poly.js"/> */}
                <link rel="stylesheet" href="/statics/styles/global.css" />
                <link rel="stylesheet" href="/statics/styles/colors.css" />
                <link rel="stylesheet" href="/statics/styles/fonts.css" />
                {/* <link rel="stylesheet" href="/statics/styles/forced.css" /> */}
                <link rel="stylesheet" href="/statics/styles/shadows.css" />
                <link rel="stylesheet" href="/statics/styles/animate.min.css" />
            </Head>
            <ChestComponent/>
            <Component {...pageProps} />
            
        </>
    );
}
