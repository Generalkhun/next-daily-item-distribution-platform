import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layouts from '../components/Layouts'
import { GoogleSheetDataProvider } from '../contextProviders/GoogleSheetContextProvider'
import { DisplayVillagerDataProvider } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { LoginContextProvider } from '../contextProviders/LoginContextProvider'
import { useWindowSize } from '../hooks/useWindowResize'
function MyApp({ Component, pageProps }: AppProps) {
  const [width] = useWindowSize()
  const [isShowDesktopOnlyScreen, setIsShowDesktopOnlyScreen] = useState<boolean>(false)
  useEffect(() => {
    if (width < 1280) {
      setIsShowDesktopOnlyScreen(true);
    }
    setIsShowDesktopOnlyScreen(false);
  }, [width])

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
            {isShowDesktopOnlyScreen ?
              <div style={{
                height: '100vh',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <img src="https://img.icons8.com/ios/50/null/imac.png" /><span>This app is currently available on desktop only</span>
              </div>
              :
              <Layouts>
                <Head>
                  <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
                </Head>
                <Component {...pageProps} />
              </Layouts>
            }
          </DisplayVillagerDataProvider>
        </GoogleSheetDataProvider>
      </LoginContextProvider>
    </ThemeProvider>

  )
}
export default MyApp
