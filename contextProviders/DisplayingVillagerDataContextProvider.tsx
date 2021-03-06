import { find, reduce } from "lodash";
import { createContext, useContext, useReducer, useState } from "react";
import { GoogleSheetDataContext } from "./GoogleSheetContextProvider";


interface Props { }

export const DisplayingVillagerDataContext = createContext({} as any)


// reducers
const displayVillagerDataReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'initialVillagerData':
            return {
                ...state,
                allVillagerData: action.payload,
                displayVillagerData: action.payload,
            }
        case 'itemCatSelect':
            return {
                ...state, filterCondition: {
                    ...state.filterCondition,
                    itemCatSelected: (action.payload + 1).toString()
                }
            }

        case 'togglefilterByAreaOff':
            return {
                ...state,
                mapRectangle: [],
                filterCondition: {
                    ...state.filterCondition,
                    isFilterByArea: false
                }
            }
        case 'togglefilterByAreaOn':
            return {
                ...state, filterCondition: {
                    ...state.filterCondition,
                    isFilterByArea: true
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
        // save map rectangle 
        case 'updateMapRectangle':
            return {
                ...state,
                mapRectangle: action.payload
            }
        // update focused villager
        case 'updateFocusingVillager':
            return {
                ...state,
                focusedVillagerId: parseInt(action.payload)
            }

        // update item recieved status on update
        case 'updateSuccessVillagerItemRecievedStatus':
            const { villagerId, updatedRecievedItemList } = action.payload

            // find the updated villager
            let updatedVillager = find(state.displayVillagerData, villager => villager.HOME_ID === villagerId)

            // update ITEM_RECIEVED to be updated item recieved list
            if (updatedVillager) {
                updatedVillager.ITEM_RECIEVED = updatedRecievedItemList
            }

            return state
        default:
            return state
    }
}

export const DisplayVillagerDataProvider: React.FC<Props> = ({ children }) => {
    const { googleSheetVillagerData } = useContext(GoogleSheetDataContext) // get google sheet data to init to display
    const [displayVillagerState, displayVillagerDispatch] = useReducer(displayVillagerDataReducer, {
        allVillagerData: googleSheetVillagerData,
        displayVillagerData: googleSheetVillagerData,
        filterCondition: {
            displayOnlyNotrecieved: false,
            isFilterByArea: false,
            itemCatSelected: 1,
        },
        focusedVillagerId: 1,
        isDrawableMapMode: false,
        mapRectangle: [],
    })

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