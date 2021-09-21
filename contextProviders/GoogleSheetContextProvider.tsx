import { useState, createContext } from "react";

interface Props { }
export const GoogleSheetDataContext = createContext({} as any);

export const GoogleSheetDataProvider: React.FC<Props> = ({ children }) => {
    const [googleSheetVillagerData, setGoogleSheetVillagerData] = useState({} as any);
    const [googleSheetItemCatData, setGoogleSheetItemCatData] = useState({} as any)
    const initializeVillagerSheetData = (fetchedggSheetVillagerData: any) => setGoogleSheetVillagerData(fetchedggSheetVillagerData)
    const initializeItemCatSheetData = (fetchedggSheetItemCatData: any) => setGoogleSheetItemCatData(fetchedggSheetItemCatData)
    return (
        <GoogleSheetDataContext.Provider
            value={
                {
                    googleSheetVillagerData,
                    googleSheetItemCatData,
                    initializeVillagerSheetData,
                    initializeItemCatSheetData
                }
            }
        >
            {children}
        </ GoogleSheetDataContext.Provider>

    )
}


