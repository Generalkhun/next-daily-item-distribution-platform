import { useState, createContext } from "react";

interface Props {}
export const GoogleSheetDataContext = createContext({} as any);

export const GoogleSheetDataProvider: React.FC<Props> = ({ children }) => {
    const [googleSheetVillagerData, setGoogleSheetVillagerData] = useState({} as any);
    const initializeVillagerSheetData = (fetchedggSheetData: any) => setGoogleSheetVillagerData(fetchedggSheetData)
    return (
        <GoogleSheetDataContext.Provider
            value={
                {
                    googleSheetVillagerData,
                    initializeVillagerSheetData
                }
            }
        >
            {children}
        </ GoogleSheetDataContext.Provider>

    )
}


