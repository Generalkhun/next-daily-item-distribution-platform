import { createContext, useContext, useReducer, useState } from "react";
import { GoogleSheetDataContext } from "./GoogleSheetContextProvider";


interface Props { }

export const DisplayingVillagerDataContext = createContext({} as any)


// reducers
const displayVillagerDataReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'initialVillagerData':
            return { ...state, displayVillagerData: action.payload }
        case 'itemCatSelect':
            return {
                ...state, filterCondition: {
                    ...state.filterCondition,
                    itemCatSelected: (action.payload + 1).toString()
                }
            }
        case 'filterByArea':
            return {
                ...state, filterCondition: {
                    ...state.filterCondition,
                    customAreaRegtangleSelectorLatLng: action.payload
                }
            }
        // return { ...state, displayVillagerData: filterDisplayVillagerByArea(action.payload.filterByAreaData,state.allVillagerData,filterCondition:{...state.filterCondition,}) }
        case 'filterByFoodRecieved':
            return {
                ...state, filterCondition: {
                    ...state.filterCondition,
                    displayOnlyNotrecieved: !state.filterCondition.displayOnlyNotrecieved
                }
            }
        case 'focusOnVillager':
            return state

        // mode on the map,  wether will be drawable or normal map
        case 'toggleDrawableMapModeOn':
            return {
                ...state,
                isDrawableMapMode: true
            }
        case 'toggleDrawableMapModeOff':
            return {
                ...state,
                isDrawableMapMode: false
            }
        default:
            return state
    }
    return
}

export const DisplayVillagerDataProvider: React.FC<Props> = ({ children }) => {


    const { googleSheetVillagerData } = useContext(GoogleSheetDataContext) // get google sheet data to init to display

    const [displayVillagerState, displayVillagerDispatch] = useReducer(displayVillagerDataReducer, {
        allVillagerData: googleSheetVillagerData,
        displayVillgerData: googleSheetVillagerData,
        filterCondition: {
            displayOnlyNotrecieved: false,
            filteredDisplayVillgerLatLng: [],
            filterCondition: 1,
        },
        focusedVillagerId: 1,
        isDrawableMapMode: false
    })
    // const [displayVillagerData, setDisplayVillagerData] = useState(initalDisplayVillagerData)
    // const updateDisplayingVillagerData = (newDisplayingVillagerData: any) => {
    //     displayVillagerDispatch({type:'initialVillagerData', payload: newDisplayingVillagerData})
    // }
    return (
        <DisplayingVillagerDataContext.Provider
            value={{
                displayVillagerState,
                displayVillagerDispatch
            }}
        >
            {children}

        </DisplayingVillagerDataContext.Provider>
    )
}



// export const GoogleSheetDataProvider: React.FC<Props> = ({ children }) => {
//     const [googleSheetData, setGoogleSheetData] = useState({} as any);
//     return (
//         <GoogleSheetDataContext.Provider
//             value={
//                 {
//                     googleSheetData,
//                     InitializeSheetData: (fetchedggSheetData: any) => setGoogleSheetData(fetchedggSheetData)
//                 }
//             }
//         >
//             {children}
//         </ GoogleSheetDataContext.Provider>

//     )
// }

