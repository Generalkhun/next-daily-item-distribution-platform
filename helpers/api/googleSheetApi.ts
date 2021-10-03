import { google } from "googleapis"
import { get } from "lodash";
import { GOOGLE_SHEET_AUTH_CONFIG, SHEET_RANGE_ITEM_CAT, SHEET_RANGE_MAIN_PAGE, SHEET_RANGE_ADD_PEOPLE, USER_ENTERED } from "../../constants";
import { VillagerAddingFormState } from "../../type";
import { formatGoogleSheetDataResponse } from "../utils/formatGoogleSheetDataResponse";
import { transformToArrayTobeAddedVillagerData } from "../utils/transformToArrayTobeAddedVillagerData";


// This funtion is to connect googlesheet api
const connectGoogleSheetsApi = async () => {
    const auth = await google.auth.getClient(GOOGLE_SHEET_AUTH_CONFIG)
    // connect to googlesheet 
    const sheets = google.sheets({ version: 'v4', auth })
    return sheets
}

/**
 * this funtion is to fetch all data from the googlesheet, SHEET_RANGE_MAIN_PAGE is use as a constant to provide the api which range in the sheet we need
 *  */
export const getAllVillagerDataFromGoogleSheet = async () => {

    const sheets = await connectGoogleSheetsApi()

    //query and return response
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: SHEET_RANGE_MAIN_PAGE
    })

    return formatGoogleSheetDataResponse(get(response, 'data.values'))
}

export const getItemCatDataFromGoogleSheet = async () => {
    const sheets = await connectGoogleSheetsApi()

    //query and return response
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: SHEET_RANGE_ITEM_CAT
    })

    return formatGoogleSheetDataResponse(get(response, 'data.values'))
}


/**
 * Add a record to google sheet 
 */
// Add a villager data
export const addVillagerDataToGoogleSheet = async (tobeAddedVillagerData: VillagerAddingFormState) => {
    console.log('tobeAddedVillagerData', tobeAddedVillagerData);

    // transform the tobeAddedVillagerData to arrays format 
    const tobeAddedVillagerDataArray = transformToArrayTobeAddedVillagerData(tobeAddedVillagerData)

    // connect to the sheet 
    const sheets = await connectGoogleSheetsApi()

    // request 
    const request = {
        spreadsheetId: process.env.SHEET_ID,
        range: SHEET_RANGE_ADD_PEOPLE,
        valueInputOption: USER_ENTERED,
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
            "majorDimension": "ROWS",
            "values": [tobeAddedVillagerDataArray],
        }
    }
    // append data on a google sheet row
    const response = await sheets.spreadsheets.values.append(request)
    return response
}