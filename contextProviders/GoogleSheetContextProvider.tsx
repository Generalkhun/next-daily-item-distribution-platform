import { Props } from "google-map-react";
import { useState, createContext } from "react";


export const GoogleSheetDataContext = createContext({} as any);

export const GoogleSheetDataProvider: React.FC<Props> = ({ children }) => {
    const [googleSheetData, setGoogleSheetData] = useState({} as any);
    return (
        <GoogleSheetDataContext.Provider
            value={
                {
                    googleSheetData,
                    InitializeSheetData: (fetchedggSheetData: any) => setGoogleSheetData(fetchedggSheetData)
                }
            }
        >
            {children}
        </ GoogleSheetDataContext.Provider>

    )
}


