import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import Layouts from '../components/Layouts'
import { GoogleSheetDataProvider } from '../contextProviders/GoogleSheetContextProvider'

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <GoogleSheetDataProvider>
        <Layouts>
          <Head>
            <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
          </Head>
          <Component {...pageProps} />
        </Layouts>
      </GoogleSheetDataProvider>


    </>

  )
}
export default MyApp
