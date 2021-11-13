import { useState, createContext } from "react";

interface Props { }
export const LoginContext = createContext({} as any);

export const LoginContextProvider: React.FC<Props> = ({ children }) => {
    //localStorage.getItem()
    const [isLogin, setIsLogin] = useState(false)
    return (
        <LoginContext.Provider
            value={
                {
                    isLogin,
                    setIsLogin
                }
            }
        >
            {children}
        </ LoginContext.Provider>

    )
}


