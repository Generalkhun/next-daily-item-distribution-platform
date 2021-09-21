import { google } from "googleapis"
import { get } from "lodash";
import { GOOGLE_SHEET_AUTH_CONFIG, SHEET_RANGE_ITEM_CAT, SHEET_RANGE_MAIN_PAGE } from "../../constants";
import { formatGoogleSheetDataResponse } from "../utils/formatGoogleSheetDataResponse";


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