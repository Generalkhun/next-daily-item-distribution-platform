import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layouts from '../components/Layouts'
import { GoogleSheetDataProvider } from '../contextProviders/GoogleSheetContextProvider'
import { DisplayVillagerDataProvider } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { LoginContextProvider } from '../contextProviders/LoginContextProvider'
import useWindowSize from '../hooks/useWindowResize'
function MyApp({ Component, pageProps }: AppProps) {
  const [width] = useWindowSize();
  const theme = createTheme({
    typography: {
      "fontFamily": `"Kanit","Roboto", "Helvetica", "Arial", sans-serif`,
      "fontSize": 16,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <LoginContextProvider>
        <GoogleSheetDataProvider>
          <DisplayVillagerDataProvider>
            <Layouts>
              <Head>
                <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
              </Head>
              <Component {...pageProps} />
            </Layouts>
          </DisplayVillagerDataProvider>
        </GoogleSheetDataProvider>
      </LoginContextProvider>
    </ThemeProvider>

  )
}
export default MyApp
