import { isEmpty } from "lodash";
import router from "next/dist/client/router";
import { useState, createContext, useContext } from "react";
import { SESSION_COOKIE_VALUE, SESSION_ID_COOKIE, VALIDATE_SESSION_URL } from "../constants";
import { getCookie, setCookie } from "../helpers/utils/cookies";

interface Props { }
export const LoginContext = createContext({} as any);

export const LoginContextProvider: React.FC<Props> = ({ children }) => {
    //localStorage.getItem()
    const [isLogin, setIsLogin] = useState(false)
    const loginSessionChecker = () => {
        // get sessionId on cookie
        let sessionId = getCookie(SESSION_ID_COOKIE)
        if (!isEmpty(sessionId)) {
            if (sessionId === SESSION_COOKIE_VALUE) {
                return true
            }
        }
        return false
    }
    const loginSuccessHandler = () => {
        setIsLogin(true)

        // Set cookies
        setCookie(SESSION_ID_COOKIE, SESSION_COOKIE_VALUE, 0.3)

        // navigate to main page
        typeof window !== 'undefined' && router.push('/')

    }

    const logoutHandler = () => {
        setIsLogin(false)
        setCookie(SESSION_ID_COOKIE, 'tmpCookie', 0.01) // remove cookie
        // navigate to login page
        typeof window !== 'undefined' && router.push('/login')
    }

    return (
        <LoginContext.Provider
            value={
                {
                    isLogin, // used on every rendered screen, if not login, will navagated back to loginscreen
                    loginSuccessHandler, //use on login page to login 
                    logoutHandler, //use on logout funtion
                    loginSessionChecker, // use to check if the cookie contained valid sessionId
                }
            }
        >
            {children}
        </ LoginContext.Provider>

    )
}
