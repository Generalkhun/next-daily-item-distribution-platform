import router from "next/dist/client/router";
import { useState, createContext, useContext } from "react";

interface Props { }
export const LoginContext = createContext({} as any);

export const LoginContextProvider: React.FC<Props> = ({ children }) => {
    //localStorage.getItem()
    const [isLogin, setIsLogin] = useState(false)
    const loginSuccessHandler = () => {
        setIsLogin(true)
        // navigate to main page
        typeof window !== 'undefined' && router.push('/')

    }

    const logoutHandler = () => {
        setIsLogin(false)
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
                }
            }
        >
            {children}
        </ LoginContext.Provider>

    )
}
